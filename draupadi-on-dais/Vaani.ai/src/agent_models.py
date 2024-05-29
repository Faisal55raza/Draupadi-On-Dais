from dataclasses import dataclass


@dataclass
class OutreachTarget:
    name: str
    email: str
    company: str
    position: str
    bio: str
    linkedin: str