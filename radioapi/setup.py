from setuptools import _install_setup_requires, setup, find_packages
import os

add_packages = find_packages(exclude=(
    'tests',
    'json_format',
    'GNU Radio',
    'mocks'))

print("add_packages:")
print(add_packages)
print()

libFolder = os.path.dirname(os.path.realpath(__file__))
requirementsPath = libFolder + "/requirements.txt"

install_requirements=[]
if os.path.isfile(requirementsPath):
    with open(requirementsPath) as f:
        install_requirements = f.read().splitlines()

print("Requirements:")
print(install_requirements)
print()

for package in install_requirements:
    add_packages.append(package)

print("All packages:")
print(add_packages)
print()

setup(
    name='radioapi',
    version='0.0.1',
    description='Purdue Orbital Radio API',
    long_description='TODO',
    author='Matt Drozt',
    author_email='matthew.drozt@gmail.com',
    url='https://github.com/purdue-orbital/PSUI',
    license='TODO',
    packages=add_packages
)
