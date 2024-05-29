import os
import re
import smtplib
from email.message import EmailMessage
from textwrap import dedent

from crewai import Crew
from dotenv import load_dotenv

from .agent_models import OutreachTarget
from .agents import cold_mail_agent
from .tasks import cold_mail_tasks

# Loading .env variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")


def outreach(target: OutreachTarget, send_mail: bool = False) -> str:
    email_template = dedent(
        """
        Subject: Invitation to Speak: Join Draupadi on the Dais

        Dear [Speaker's Name],

        I hope this message finds you well.

        I'm reaching out to you on behalf of Decoding Draupadi and our platform, Draupadi on the Dais. Your name has been suggested to us as a highly esteemed and knowledgeable speaker in your field, and we would be honored to invite you to join our network of women experts.

        Draupadi on the Dais is dedicated to amplifying the voices of women leaders across diverse industries, and we believe that your expertise and insights would greatly benefit our community. As a speaker on our platform, you would have the opportunity to participate in various speaking engagements, panel discussions, and other events where your expertise is needed.

        Our platform aims to address the gender imbalance often observed in public forums by providing event organizers with easy access to a diverse range of talented women speakers like yourself.

        If you are interested in joining Draupadi on the Dais and becoming part of our exclusive network, please create account on our platform: https://draupadionthedais.com/.

        Thank you for considering our invitation. We look forward to the possibility of welcoming you to Draupadi on the Dais and working together to inspire and empower women everywhere.

        Warm regards,

        Vaani
        PR Lead
        Draupadi on the Dais
        """
    )

    # 1. Create agents
    agents = cold_mail_agent.EmailPersonalizationAgents()

    email_personalizer = agents.personalize_email_agent()
    ghostwriter = agents.ghostwriter_agent()

    # 2. Create tasks
    cur_tasks = cold_mail_tasks.PersonalizeEmailTask()

    personalize_email_tasks = []
    ghostwrite_email_tasks = []

    # Create a personalize_email task for each recipient
    _personalize_email_task = cur_tasks.personalize_email(
        agent=email_personalizer, target=target, email_template=email_template
    )

    # Create a ghostwrite_email task for each recipient
    _ghostwrite_email_task = cur_tasks.ghostwrite_email(
        agent=ghostwriter,
        draft_email=_personalize_email_task,
        target_name=target.name,
    )

    # Add the task to the crew
    personalize_email_tasks.append(_personalize_email_task)
    ghostwrite_email_tasks.append(_ghostwrite_email_task)

    # Setup Crew
    crew = Crew(
        agents=[email_personalizer, ghostwriter],
        tasks=[*personalize_email_tasks, *ghostwrite_email_tasks],
        max_rpm=29,
    )

    result: str = crew.kickoff()

    # Send the email
    subject_search = re.search(r"\nSubject: (.+?)\n(.*)", result, re.DOTALL)
    if subject_search:
        SUBJECT = subject_search.group(1)
        MESSAGE_BODY = dedent(subject_search.group(2))
    else:
        SUBJECT = "Invitation to Speak: Join Draupadi on the Dais"
        MESSAGE_BODY = dedent(
            """
            I hope this message finds you well.

            I'm reaching out to you on behalf of Decoding Draupadi and our platform, Draupadi on the Dais. Your name has been suggested to us as a highly esteemed and knowledgeable speaker in your field, and we would be honored to invite you to join our network of women experts.

            Draupadi on the Dais is dedicated to amplifying the voices of women leaders across diverse industries, and we believe that your expertise and insights would greatly benefit our community. As a speaker on our platform, you would have the opportunity to participate in various speaking engagements, panel discussions, and other events where your expertise is needed.

            Our platform aims to address the gender imbalance often observed in public forums by providing event organizers with easy access to a diverse range of talented women speakers like yourself.

            If you are interested in joining Draupadi on the Dais and becoming part of our exclusive network, please create account on our platform: https://draupadionthedais.com/.

            Thank you for considering our invitation. We look forward to the possibility of welcoming you to Draupadi on the Dais and working together to inspire and empower women everywhere.

            Warm regards,

            Vaani
            PR Lead
            Draupadi on the Dais
            """
        )
    if send_mail:
        FROM_MAIL = os.getenv("VAANI_MAIL")
        FROM_MAIL_PASSWORD = os.getenv("VAANI_MAIL_PASSWORD")
        msg = EmailMessage()
        msg["Subject"] = SUBJECT
        msg["From"] = FROM_MAIL
        msg["To"] = target.email
        msg.set_content(MESSAGE_BODY)

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            if FROM_MAIL and FROM_MAIL_PASSWORD:
                smtp.login(FROM_MAIL, FROM_MAIL_PASSWORD)
                smtp.send_message(msg)

        print(f"Sent mail to {target.email}")
    return MESSAGE_BODY


# def chat(msg: str) -> str:
#     ...


# def linkedin_outreach(domain: str, event: str):
#     ...

# outreach(
#     OutreachTarget(
#         name="Mridvika Raisinghani",
#         email="harshraj2717@gmail.com",
#         bio="With over 18 years of diverse and cross-functional experience in technology services, consulting, non-profit, Ed-Tech, and HR Tech start-ups, I am passionate about solving complex business problems and creating systems and structures out of chaos. I have successfully led and grown businesses to scale, leveraging my analytical, data-driven, and strategic thinking skills. I host and produce a podcast that showcases the stories and challenges of working mothers, and I am an active member and advisor of various communities and platforms that support high-growth operators and entrepreneurs. I believe in the power of collaboration, innovation, and diversity to drive positive social impact.",
#         company="Sama",
#         position="Co-founder and CTO",
#         linkedin="https://www.linkedin.com/in/mridvika/",
#     )
# )
