FROM python:3.6

RUN pip install pipenv

COPY Pipfile Pipfile.lock ./

RUN pipenv install --system && rm Pipfile Pipfile.lock

CMD [ "tail", "-f", "/dev/null" ]
