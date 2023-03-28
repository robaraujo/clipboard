## Refactoring
This challenge is in JavaScript. Even if it's not your primary language, you should still give it a shot!

You've been asked to refactor the attached function to make it easier to read and understand without changing its functionality. For this task, you should:

1) Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2) Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do 3) like to use the latest JS language features when applicable.
Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

## Improvements

1) Move constants out of fn so they can be used in other files like tests
2) Excessive indentation removed for easier reading
3) If empty event, return default value
4) If partitionKey is empty a hash will be generated, so there is not need to test length and is string
