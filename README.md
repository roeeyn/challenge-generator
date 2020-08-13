# Prepadawans Challenge Generator

Prepadawans is the selected name for those who are trying to be selected as participants in the [Hackademy's Bootcamp](https://www.hackademy.mx).
This project is to automate the creation of the challenges they have to solve to be eligible for the boot camp.

## Installation

You may install this as a global dependency for npm, so you can execute it later as a usual command.

```bash
npm i @hackademymx/challenges-generator
```

## Usage
After installing the package, you have to execute it wherever you want to create the challenges folder.

```bash
challenges-generator
```

It will prompt for a generation number or alias, and then create the folder with the challenges inside. 

### Automatic GitHub Repo Creation
If you have the environment variable `GITHUB_TOKEN`, then a GitHub repo will be created for you to upload the challenges. Keep in mind that this created repo is built with the template option enabled, so you can share easily with GitHub Classroom. You may change this setting in the created repo settings section.

If you want to know how to create the token click here.

### Generated Folder Structure
Inside the generated folder structure, there will be 7 folders, each one represents one isolated challenge. Inside each challenge folder, you will find the `README` with the particular challenge instructions.

**IMPORTANT** The tests we use to automate the exercises are not perfectly parsed yet, so you have to make sure they are correct before uploading them. Also, you may try to solve the challenges to verify everything is correct too.

If you want to see the status of the complete parsed tests feature, click here.

## Contribute
Feel free to write an issue or create a PR if you think something can be done better.

## Special Thanks
Thanks to [Edabit](https://edabit.com/) for creating such an amazing platform and sharing their challenges to the world. :tada:

According to the [Edabit](https://edabit.com/) terms of service (https://edabit.com/docs/terms), forking and editing content is allowed:
> In submitting Content, including authored challenges, you agree to allow others to view, fork and edit your Content.

Thanks to [@MikeFranco](https://github.com/MikeFranco) who helped me creating the [edabit web scraper](https://github.com/roeeyn/EdabitScraper) that we used to automate the creation of the challenges.


Made with 💙 from 🇲🇽🌮
