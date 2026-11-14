#!/usr/bin/env sh
# Builds the site in containers, on any OS with Docker.
#
#   ./build.sh          compile the sources (Node) and build _site/ (Jekyll)
#   ./build.sh compile  compile only: _includes/, code/css, code/js
#   ./build.sh serve    compile, then serve _site/ on http://localhost:4000,
#                       rebuilding on change (sources and Jekyll both)
#
# The compiled outputs are committed: GitHub Pages runs its own Jekyll on
# master and has no Node, so commit them after every source change.
set -eu
cd "$(dirname "$0")"

NODE_IMAGE=node:16-bookworm      # what package-lock.json was resolved with
RUBY_IMAGE=ruby:3.3-bookworm     # the github-pages gem pins Jekyll to what Pages runs
USER_ID="$(id -u):$(id -g)"

node_run() {
  docker run --rm -u "$USER_ID" -e HOME=/tmp -v "$PWD":/site -w /site "$@"
}
ruby_run() {
  docker volume create personal-web-gems >/dev/null
  docker run --rm -u "$USER_ID" -e HOME=/tmp -e BUNDLE_PATH=/gems \
    -v personal-web-gems:/gems -v "$PWD":/site -w /site "$@"
}

compile() {
  [ -d node_modules ] || node_run "$NODE_IMAGE" npm ci --no-audit --no-fund
  node_run "$NODE_IMAGE" npx gulp build
}
gems() {
  # the volume is created by root; hand it to the caller once
  docker volume create personal-web-gems >/dev/null
  docker run --rm -v personal-web-gems:/gems "$RUBY_IMAGE" chown -R "$USER_ID" /gems
  ruby_run "$RUBY_IMAGE" bundle install --quiet
}

case "${1:-build}" in
  compile)
    compile ;;
  build)
    compile; gems
    ruby_run "$RUBY_IMAGE" bundle exec jekyll build ;;
  serve)
    compile; gems
    node_run -d --name personal-web-watch "$NODE_IMAGE" npx gulp watch >/dev/null
    trap 'docker rm -f personal-web-watch >/dev/null 2>&1' EXIT INT TERM
    ruby_run -p 4000:4000 "$RUBY_IMAGE" bundle exec jekyll serve --host 0.0.0.0 --port 4000 ;;
  *)
    echo "usage: $0 [build|compile|serve]" >&2; exit 2 ;;
esac
