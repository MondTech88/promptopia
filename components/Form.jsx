import Link from "next/link";

const Form = ({
  type,
  post,
  setPrompt,
  setTag,
  submitting,
  handleSubmit,
  warning,
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-1.5 glassmorphism "
      >
        <div className=" flex flex-col gap-7">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Your AI Prompt
            </span>
            <textarea
              required
              placeholder="Write your prompt here..."
              value={post.prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="form_textarea"
            />
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Tag{" "}
              <span className="font-normal">
                (#product, #webdevelopment, #idea)
              </span>
            </span>
            <input
              required
              placeholder="#tag"
              value={post.tag}
              onChange={(e) => setTag(e.target.value)}
              className="form_input"
            />
          </label>
          <div className="flex-end mx-3 mb-0 gap-4">
            <Link href="/" className="text-gray-500 text-sm">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-7 py-1.5 text-sm bg-primary-orange rounded-full text-white hover:bg-orange-700"
            >
              {submitting ? `${type}...` : type}
            </button>
          </div>
        </div>
        <div>
          <p className="text-red-500 text-right my-0 font-satoshi">
            {warning ? "Login to Your account before submitting" : ""}
          </p>
        </div>
      </form>
    </section>
  );
};

export default Form;

// GET /api/auth/session 200 in 32846ms
// [next-auth][error][JWT_SESSION_ERROR]
// https://next-auth.js.org/errors#jwt_session_error Operation `users.findOne()` buffering timed out after 10000ms {
//   message: 'Operation `users.findOne()` buffering timed out after 10000ms',
//   stack: 'MongooseError: Operation `users.findOne()` buffering timed out after 10000ms\n' +
//     '    at Timeout.<anonymous> (/run/media/mondo88/Mondo-88/mondo_88/projects_88/dev/reactjs/promptopia/node_modules/mongoose/lib/drivers/node-mongodb-native/collection.js:185:23)\n' +
//     '    at listOnTimeout (node:internal/timers:573:17)\n' +
//     '    at process.processTimers (node:internal/timers:514:7)',
//   name: 'MongooseError'
// }
//  GET /api/auth/session 200 in 13027ms
