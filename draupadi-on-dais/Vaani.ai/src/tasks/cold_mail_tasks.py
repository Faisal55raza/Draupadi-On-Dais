from crewai import Task

from ..agent_models import OutreachTarget


class PersonalizeEmailTask:
    def personalize_email(self, agent, target: OutreachTarget, email_template):
        return Task(
            description=f"""
                Personalize the template email for recipient using their information.

                - Name: {target.name}
                - Email: {target.email}
                - Bio: {target.bio}
                - Company: {target.company}
                - Position: {target.position}
                - LinkedIn: {target.linkedin}

                Important Info to consider:
                - When personalizing the email, only use one sentence from the bio. 
                    And make sure to incorporate it naturally into the email. Without going too much in to detail.
                - Make sure to keep the updated email roughly the same same length as the template email.
                
                The template email is as follows:

                ```
                {email_template}
                ```
            """,
            agent=agent,
            expected_output=f"Personalized email draft.",
            async_execution=True,
        )

    def ghostwrite_email(self, agent, draft_email, target_name):
        return Task(
            description=f"""
                Revise the draft email to adopt the following writing style.

                Writing Style:
                - Use a slightly informal, engaging, and slightly sales-oriented tone, mirroring ghost writer's final email communication style. 
                - This approach prioritizes clear, direct communication while maintaining a friendly and approachable tone. 
                - Use straightforward language, including phrases like "Hey [Name]!" to start emails or messages. 
                - The tone will be comforting, optimistic and encouraging, aiming to build rapport and motivate action, while staying grounded in practical advice.

                Important Notes:
                - Do not use emojis.
                - Do not use slurs.
                - The email is to be sent to women speakers & leaders for marketing of our platform.
            """,
            agent=agent,
            context=[draft_email],
            expected_output=f"A revised email draft in ghost writer's specified tone and style.",
        )
