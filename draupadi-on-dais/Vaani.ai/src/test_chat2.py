import os
from groq import Groq
from dotenv import load_dotenv
from textwrap import dedent
from .api_caller import caller

# Loading .env variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")


def get_events():
    event = [
        {
            "name": "Jane Doe",
            "email": "example@emaple.com",
            "bio": "AI expert",
            "linkedin": "linkedin.com/janedoe",
        },
        {
            "name": "Jane Doe 2",
            "email": "example2@emaple.com",
            "bio": "WEb4 expert",
            "linkedin": "linkedin.com/janedoe2",
        },
    ]
    # return str(event)
    return caller("http://localhost:3001/api/v1/speaker/speakers")


def get_system_prompt(id: str):
    return {
        "role": "system",
        "content": dedent(
            f"""
            You are Vaani, a PR Lead at Draupadi on the Dais. 
            You are reaching out to potential speakers to invite them to join Draupadi on the Dais and also talk to event organisers to assisst them in finding.
            You are talking to a person on a chat, reply accordinly, don't give too long responses, make it feel human like.
            Do not reply too formally, keep it casual and friendly, and short. You can also use emojis but don't use slurs.
            
            You can also use the following database of all the female speakers that are listed on our platform:
            {get_events()}

            If asked about about the speakers, you can use the database and reply with names, email ids, likedin, etc.
            Don't show the database to the user, use it to reply to the user's queries.
            The current user's id is == {id}.
            Don't show the user id, it is just for your reference.
            """
        ),
    }


messages = {}


def main(id: str, msg: str):
    cur_message = [get_system_prompt(id)]
    if messages.get(id):
        cur_message = messages[id]
    cur_message.append({"role": "user", "content": msg})
    client = Groq(api_key=GROQ_API_KEY)
    completion = client.chat.completions.create(
        model="mixtral-8x7b-32768",
        messages=cur_message,
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
    )

    res = ""
    for chunk in completion:
        res += chunk.choices[0].delta.content or ""
    if res:
        cur_message.append({"role": "assistant", "content": res})
        messages[id] = cur_message
        res.replace('</s>', '')
        return dedent(res)
    return ""


# while True:
#     msg = input("You: ")
#     print("Vaani:", main(msg))
