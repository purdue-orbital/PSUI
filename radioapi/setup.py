from setuptools import setup, find_packages

setup(
    name='radioapi',
    version='0.0.2',
    description='Purdue Orbital Radio API',
    long_description='TODO',
    author='Matt Drozt',
    author_email='matthew.drozt@gmail.com',
    url='https://github.com/purdue-orbital/PSUI',
    license='TODO',
    packages=find_packages(exclude=(
            'tests',
            'json_format',
            'GNU Radio',
            'mocks'
        )
    )
)
