# holiday-planner

This is a planner web app which provides information about all the holidays in Bulgaria.

## Check out the [Wiki](https://github.com/rumenpetrov/holiday-planner/wiki)

## Requirements

- node 24+
- npm 11+
- podman 5+

## Initial setup

1. Create the environment variables file and set all the required values

```bash
$ cp .env.example .env
```

2. Make all scripts executable and run the setup-env script which will create the app's podman image

```bash
$ chmod +x ./bin/*
$ ./bin/setup-env.sh
```

3. Run the app in dev mode (make sure port 4321 is free on your machine)

```bash
$ ./bin/start.sh
```

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
