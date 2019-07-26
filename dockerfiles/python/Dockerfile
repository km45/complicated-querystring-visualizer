FROM python:3.7.4-slim

RUN pip install pipenv==2018.11.26

COPY Pipfile Pipfile.lock ./

RUN pipenv install --system && rm Pipfile Pipfile.lock

CMD [ "tail", "-f", "/dev/null" ]
