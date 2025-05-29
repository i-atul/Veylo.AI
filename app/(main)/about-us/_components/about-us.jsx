import Image from "next/image";

const team = [
  {
    name: "Mishel Johnson",
    role: "Founder & CEO",
    image: "/team/team-user.png",
  },
  {
    name: "Andrew Ng",
    role: "CTO",
    image: "/team/team-user.png",
  },
  {
    name: "Sarah Thompson",
    role: "Lead Engineer",
    image: "/team/team-user.png",
  },
];

export default function AboutUs() {
  return (
    <section className="max-w-4xl mx-auto py-16 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 gradient-title">
          About Veylo
        </h1>
       
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-2 text-cyan-700">Our Mission</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          To revolutionize the automotive marketplace by harnessing the power of
          artificial intelligence. We provide users with the most accurate
          matches, verified listings, and a frictionless journey from search to
          purchase. Our mission is to empower our community with data-driven
          insights and unparalleled support at every step.
        </p>
      </div>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-2 text-cyan-700">Our Vision</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          To become the most trusted and innovative platform for vehicle
          transactions worldwide. We envision a future where technology bridges
          the gap between buyers and sellers, making car ownership accessible,
          reliable, and enjoyable for everyone.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-700">
          Meet Our Leadership
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 w-64 border border-gray-100 hover:shadow-lg transition"
            >
              <div className="w-28 h-28 mb-4 rounded-full overflow-hidden bg-gray-100 border-4 border-cyan-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="font-semibold text-lg text-gray-800">
                {member.name}
              </div>
              <div className="text-cyan-700 text-sm font-medium mb-2">
                {member.role}
              </div>
              <p className="text-gray-500 text-xs text-center">
                {member.role === "Founder & CEO"
                  ? "Visionary leader with a passion for innovation and customer experience."
                  : member.role === "CTO"
                  ? "Tech enthusiast driving the future of automotive AI."
                  : "Expert engineer dedicated to building robust, user-friendly solutions."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
