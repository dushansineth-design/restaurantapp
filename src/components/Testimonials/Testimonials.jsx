// components/Testimonials.jsx
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      comment: 'The food was amazing! Best restaurant in town.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      comment: 'Great ambience and excellent service. Will come back!',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      comment: 'The flavors were beyond my expectations. Highly recommended!',
    },
  ];

  return (
    <section className="testimonials section-padding" style={{ backgroundColor: '#000000ff' }}>
      <div className="container">
        <h2 className="section-title">What Our Guests Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="testimonial-content">
                <p>"{testimonial.comment}"</p>
              </div>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;