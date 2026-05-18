import React from 'react'
import about from "../assets/about.png"

const About = () => {
  return (
    <main className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
              About Cravenings
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
              Cravenings is your go-to food delivery platform that brings the best local restaurants right to your door.
              We make discovering, ordering, and enjoying food fast, easy, and delightful.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Fast Delivery</h2>
                <p className="text-sm text-slate-600 mt-2">
                  Get your favorite meals delivered hot and fresh in under an hour.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Trusted Partners</h2>
                <p className="text-sm text-slate-600 mt-2">
                  We partner with top-rated restaurants to bring you quality options you can count on.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src={about}
              alt="About Cravenings"
              className="w-full h-72 sm:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-slate-900 text-white py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">Our Mission</h2>
              <p className="text-base sm:text-lg leading-relaxed text-slate-200">
                We exist to bring joy to mealtime by making great food easy to find and even easier to order.
                Whether you're craving comfort food or something new, we help you discover the best local flavors.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-slate-200">
                From seamless ordering to fast delivery, we focus on creating an experience that feels effortless.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                  ✓
                </span>
                <div>
                  <h3 className="text-lg font-semibold">Quality First</h3>
                  <p className="text-sm text-slate-200">Only the best restaurants make it onto our platform.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-white">
                  ✓
                </span>
                <div>
                  <h3 className="text-lg font-semibold">Customer Focused</h3>
                  <p className="text-sm text-slate-200">We listen, iterate, and improve with every order.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white">
                  ✓
                </span>
                <div>
                  <h3 className="text-lg font-semibold">Always Available</h3>
                  <p className="text-sm text-slate-200">Reliable support and live tracking whenever you need it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Ready to Order?</h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Explore restaurants near you, discover fresh menu items, and enjoy great food delivered fast.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
