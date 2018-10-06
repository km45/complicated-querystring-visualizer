FROM python:3.6-slim

RUN pip install pipenv

COPY Pipfile Pipfile.lock ./

RUN pipenv install --system && rm Pipfile Pipfile.lock

CMD [ "tail", "-f", "/dev/null" ]
