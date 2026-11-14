# daniil.koshelyuk.site

The person page of Daniil Koshelyuk: student work in architecture, 2015–2018. Current work is at [Polytope Solutions](https://www.polytope.solutions).

Structure is written in Pug and styles in Sass (`code/`); gulp compiles them into `_includes/`, `code/css` and `code/js`, which carry Liquid. GitHub Pages builds `master` with its own Jekyll and fills that Liquid from `_data/`. Pages has no Node, so **the compiled outputs are committed**.

## Building

Needs Docker and nothing else; Node and Ruby run in containers.

```sh
./build.sh          # compile the sources and build _site/
./build.sh compile  # compile only — then commit _includes/, code/css, code/js
./build.sh serve    # compile, then serve on http://localhost:4000 and rebuild on change (PORT=… to move it)
```

Node is 16, what `package-lock.json` was resolved with. Jekyll is the `github-pages` gem's, so the local build is the one Pages runs.

## Content

Copy lives in `_data/general/*.yml` and `_data/projects/project_list.yml`, in English (`Eng`) and Spanish (`Esp`). For work, or to use any of the content, write to [daniil@polytope.solutions](mailto:daniil@polytope.solutions).
