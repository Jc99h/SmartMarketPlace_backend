#Escojo la imagen de python que voy a usar
FROM python:3.9.6
#Variable del ambiente que envia el output de python directo al terminal
ENV PYTHONUNBUFFERED 1
#Creo un directorio llamado smp-back
RUN mkdir /smp-back
#Escojo ese directorio sm-back como mi directorio de trabajo
WORKDIR /smp-back
#Copio todo lo que tengo en la carpeta del Dockerfile a smp-back
ADD . /smp-back
#Corre el pip install de los requerimientos
RUN pip install -r requirements.txt