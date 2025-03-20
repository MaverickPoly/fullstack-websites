const AboutPage = () => {
  return (
    <div className="flex max-w-6xl mx-auto py-20 gap-16">
      <img
        src="/about_image.png"
        alt="About Image"
        className="w-[480px] h-auto object-cover rounded-md"
      />
      <div className="flex flex-col">
        <h2 className="text-3xl font-semibold mb-6 mt-4">
          About <span className="text-pink-800 font-bold">Django + React</span>{" "}
          Project
        </h2>
        <p className="leading-7">
          This is a full stack web app made using Django for the backend and
          React for the framework. It was intended to practice full stack web
          development with Python and JavaScript. Very Advanced Framework called
          'Django Rest Framework' was used for the backend which made the API
          development super easy! When it comes to the frontend part, 'Axios'
          took all the work with Contexts. You can browse through other projects
          in the github of this repository and explore other full stack tools
          and programming languages!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
