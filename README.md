# Application created for real-time chat.
> Powered by React and Django.

This an open ended chatting application where a single channel exists, and anyone can join in without authentication, just by selecting a unique username.

## How to run the application

*1. Create a python3 virtual environment*
```bash
virtualenv --python=python3 venv
```

*2. Activate the virtual environment and install from the requirements*
```bash
source venv/bin/activate
pip3 install requirements.txt
```

*3.Install the required node packages*
```bash
cd frontend
npm install
cd ..
```

__If the following command doesn't work try running "python3 manage.py makemigrations && python3 manage.py migrate" first__

*4. Run the django server on this terminal*
```bash
python3 manage.py runserver
```
__open another terminal tab using ctrl + shift + T__

*5. Start the react-client*
```bash
cd frontend
npm run
```

#### Now try running two or more tabs of the react client and chatting on the group, it should give a seamless performant experience.


> Just a casual conversation


![alt_text](https://github.com/keshavvinayak01/Chat-app/blob/master/media/example1.png)

![alt_text](https://github.com/keshavvinayak01/Chat-app/blob/master/media/example2.png)
