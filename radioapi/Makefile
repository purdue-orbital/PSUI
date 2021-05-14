all:
	python setup.py install

clean:
	pip uninstall -y radioapi
	rm -rf build dist radioapi.egg-info

init:
	pip install -r requirements.txt

reqs:
	pip uninstall -y radioapi
	pip freeze > requirements.txt