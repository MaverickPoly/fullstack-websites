const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto flex gap-14 mt-20">
      <img
        src="https://images.unsplash.com/photo-1527345931282-806d3b11967f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90ZXxlbnwwfHwwfHx8MA%3D%3D"
        alt="About Notes Image"
        className="rounded-md shadow-lg shadow-emerald-900"
      />
      <div className="flex flex-col justify-center">
        <h2 className="text-4xl font-semibold mb-4">
          Notes app made with <span className="font-bold text-emerald-700">Django and React</span>
        </h2>
        <p className="text-base text-neutral-300 tracking-wide leading-7">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem dolore
          eos voluptatem, dolorum unde ea. Cupiditate, dolore dignissimos esse
          fuga impedit porro sed perspiciatis sit consectetur molestiae enim
          sint ipsum tempore aspernatur. Nemo deleniti nihil modi ullam vitae
          error labore quidem culpa dignissimos voluptates debitis officia
          explicabo neque, iste cupiditate aliquid. Placeat asperiores
          laudantium esse veniam maxime at earum explicabo? Fugiat et nihil ab
          optio provident dolorem incidunt nemo laboriosam? Saepe a porro natus
          repellat libero cumque odit, dolores possimus minus enim quasi.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
