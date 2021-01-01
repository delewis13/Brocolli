# Brocolli & Co

## A commentary on state management

Given the small size of this app, all state management _could_ have been achieved with simple use of setState.

Normally I use redux as my state-management tool, but decided to not use that here, due to the boilerplate required.
Instead I opted to use context, with which I am less familiar. Again, app would be simpler without it, but I wanted to
demonstrate that I am familiar with context / dispatch based state management.

Finally, I'm less experienced using typescript + context than I am with typescript + redux, hence the slight hack seen in `Notification.tsx`.

## Developing

Install dependencies with `yarn install`.
Run development server with `yarn start`.

## Linting & typechecking

We use `eslint` for our linter and `prettier` for formatting.
ESLint manages things like auto-sorting imports aswell.

Run `yarn lint` & `yarn tsc` prior to committing to run our linting & typechecking.

NOTE: `yarn lint` will autofix what it can, including import order, semi-colons, " vs '.

## Building

After installing dependencies via `yarn install`, build the project using webpack via `yarn build`

The build artificats will be in the `build` folder, which can be distributed seperate from the rest of this code base.

After building, you can serve it with a static server via:

```cmd
yarn global add serve
serve -s build
```

## Testing

Run `yarn test` to run the test suite which uses Jest with either Enzyme or React-Testing-Library (depending on what I felt was better for the specific use case).

Test coverage is 100%, and can be checked via `yarn coverage`.

View the coverage report with `serve -s coverage/lcov-report`
