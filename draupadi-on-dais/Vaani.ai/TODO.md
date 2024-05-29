# Things Vaani.ai needs to handle

## Miscellaneous requirements

- 1x gmail account
- 1x linkedin account
- 1x instagram account

## Needed Storage

### 1x Vaani-to-user chat history

- this needs to be accessible by all other chat windows, and all of them will store their histories here
- data structure: `dict[user_id: list[msgs]]`
- can be pulled into any chat window's API anytime

### 1x current event requests

- needs to be accessible by [spaker chat window](#1x-chat-window-for-vaani-to-speaker)
- needs to store: speaker_id, organiser_id, event_id

### 1x current speaker requests

- needs to be accessible by [organiser chat window](#1x-chat-window-for-vaani-to-organiser)
- needs to store: speaker_id, organiser_id, event_id

## Top-level chat windows

### 1x chat window for Vaani-to-speaker

> takes: details about current speaker (full database record), chat history, current event requests

- have access to events database
- have access to speakers database
- recommend events that a person can speak in (if asked to)
- recommend similar speakers (if asked to)
- talk about current event requests
- send pending event requests reminders if needed (_just say this during ppt, no need to implement ig_)

### 1x chat window for Vaani-to-organiser

> takes: details about current organiser (full database record), chat history, current speaker requests

- have access to events database
- have access to speakers database
- recommend speakers for the organiser's event
- recommend similar events (if asked to)
- talk about current speaker requests
- send pending speaker requests reminders if needed (_just say this during ppt, no need to implement ig_)
- ability to use [Find a speaker API](#find-a-speaker-using-domainevent-description-api)

## Current chat to 3rd party messaging functionalities

### 1x messaging functionality for organiser-to-Vaani-to-speaker

> takes: deatils about event (full database record), details about selected speaker(s) (full database record)
>
> dependencies: [drafter interface](#1x-prompt-drafter-for-interfacing-to-organiser-to-vaani-to-speaker)

- draft a message about the event for the speaker
- put the message in `Vaani-to-user chat history`
- send the same message on mail with link to open the website's chat

### 1x messaging functionality for speaker-to-Vaani-to-organiser

> takes: deatils about selected event(s) (full database record), details about speaker (full database record)
>
> dependencies: [drafter interface](#1x-prompt-drafter-for-interfacing-to-speaker-to-vaani-to-organiser)

- draft a message about the speaker for the event organiser
- put the message in `Vaani-to-user chat history`
- send the same message on mail with link to open the website's chat

### 1x prompt drafter for interfacing to [organiser-to-vaani-to-speaker](#1x-messaging-functionality-for-organiser-to-vaani-to-speaker)

> takes event and selected speaker(s) details, organiser chat history

- draft a message about event and send to messaging functionality

### 1x prompt drafter for interfacing to [speaker-to-vaani-to-organiser](#1x-messaging-functionality-for-speaker-to-vaani-to-organiser)

> takes selected event(s) and speaker details, organiser chat history

- draft a message about speaker and send to messaging functionality

## Automatic outreach part

<!-- ### (API) 1x Suggest a speaker API

> takes: info about the speaker being suggested to be reached out, email/linkedin of the speaker
>
> dependencies: [cold mail drafter](#1x-cold-mail-drafter)

- generate a cold mail for the speaker based on the description provided (also add who gave the reference)
- ask them to join our platform by creating an account so that they can have all the benefits
- send via email/linkedin (prefer email if provided) -->

### (API) 1x Find a speaker (using domain/event description) API

> takes in domain details, event description, locality/state preference (if any)
>
> dependencies: [cold mail drafter](#1x-cold-mail-drafter)

- generate a search term for linkedin
- use selenium to find such people by using the generated search term
- send cold msgs via linkedin to invite them to our platform

### 1x Cold mail drafter

> just modify the inputs in _TeamSync-AI-crews_

## ~~Instagram~~ -> Linkedin posts creation

### (Event) New speaker onboarded

> call this whenever a new speaker account is created
>
> dependencies: [Insta post drafter](#1x-instagram-post-drafter)

- use the speakers's profile pic either from the one submitted on the website or from the one that they have on their LinkedIn
- draft a insta post about the speaker
- "post" the post on insta

### (Event) New event added

> call this whenever a new event is created on our website
>
> dependencies: [Insta post drafter](#1x-instagram-post-drafter)

- use the event's logo submitted on the website
- draft a insta post about the speaker
- "post" the post on insta

### 1x Instagram post drafter

> takes: info about the newly onboarded speaker or the newly created event
> (maybe) just modify the inputs in _TeamSync-AI-crews_

- draft a msg about the input and just return it as a `str`

# TODO / TO-PLAN

- google meets (scheduling + joining/handling)
