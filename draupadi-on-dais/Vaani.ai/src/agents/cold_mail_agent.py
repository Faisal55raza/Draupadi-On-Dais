import os

from crewai import Agent
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()
GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
assert GROQ_API_KEY != "", "Please set your GROQ_API_KEY in a .env file"


class EmailPersonalizationAgents:
    def __init__(self):
        self.llm = ChatGroq(
            api_key=GROQ_API_KEY, model="mixtral-8x7b-32768"  # type: ignore
        )

    def personalize_email_agent(self):
        return Agent(
            role="Email Personalizer",
            goal=f"""
                Personalize template emails for recipients using their information.

                Given a template email and recipient information (name, email, company, position, bio, linkedin), 
                personalize the email by incorporating the recipient's details 
                into the email while maintaining the core message and structure of the original email. 
                This involves updating the introduction, body, and closing of the email to make 
                it more personal and engaging for each recipient.
                """,
            backstory="""
                As an Email Personalizer, you are responsible for customizing template emails for individual recipients based on their information and previous interactions.
                """,
            verbose=True,
            llm=self.llm,
            max_iter=2,
        )

    def ghostwriter_agent(self):
        return Agent(
            role="Ghostwriter",
            goal=f"""
                Revise draft emails to adopt the Ghostwriter's writing style.

                Use an informal, engaging, comforting, and slightly sales-oriented tone, mirroring the Ghostwriter's final email communication style.
                The email is to be sent to women speakers & leaders for marketing of our platform.
                """,
            backstory="""
                As a Ghostwriter, you are responsible for revising draft emails to match the Ghostwriter's writing style, focusing on clear, direct communication with a friendly and approachable tone.
                """,
            verbose=True,
            llm=self.llm,
            max_iter=2,
        )
