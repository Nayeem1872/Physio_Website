"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Calendar, Clock, ArrowLeft, Share2, User } from "lucide-react";
import { Button } from "@/components/ui/button";

// Blog post content (in a real app, this would come from a CMS or API)
const blogContent: Record<string, any> = {
  "benefits-of-physiotherapy": {
    title: "The Benefits of Regular Physiotherapy Sessions",
    image: "/placeholder.jpg",
    category: "Wellness",
    date: "December 15, 2024",
    readTime: "5 min read",
    author: "Dr. Sarah Johnson",
    content: `
      <p>Physiotherapy is more than just treatment for injuries—it's a comprehensive approach to maintaining and improving your overall health and well-being. Regular physiotherapy sessions can transform your quality of life in ways you might not expect.</p>

      <h2>Pain Management Without Medication</h2>
      <p>One of the most significant benefits of physiotherapy is its ability to manage and reduce pain naturally. Through targeted exercises, manual therapy, and specialized techniques, physiotherapists can help alleviate chronic pain conditions without relying solely on medication.</p>

      <h2>Improved Mobility and Flexibility</h2>
      <p>Whether you're recovering from an injury or dealing with age-related stiffness, physiotherapy can significantly improve your range of motion. Regular sessions help maintain joint flexibility and muscle strength, making everyday activities easier and more comfortable.</p>

      <h2>Prevention of Future Injuries</h2>
      <p>Physiotherapy isn't just reactive—it's proactive. By identifying potential problem areas and addressing muscle imbalances, physiotherapists can help prevent injuries before they occur. This is especially valuable for athletes and active individuals.</p>

      <h2>Enhanced Athletic Performance</h2>
      <p>Athletes at all levels can benefit from physiotherapy. Specialized sports physiotherapy programs can improve strength, endurance, and technique while reducing the risk of sports-related injuries.</p>

      <h2>Better Posture and Balance</h2>
      <p>In our modern world of desk jobs and screen time, poor posture has become epidemic. Physiotherapy addresses postural issues through targeted exercises and education, helping you maintain proper alignment and reduce strain on your body.</p>

      <h2>Recovery from Surgery or Illness</h2>
      <p>Post-surgical rehabilitation is crucial for optimal recovery. Physiotherapists design personalized programs to help you regain strength, mobility, and function after surgery or serious illness.</p>

      <h2>Mental Health Benefits</h2>
      <p>The benefits of physiotherapy extend beyond the physical. Regular sessions can reduce stress, improve mood, and boost confidence as you see improvements in your physical capabilities.</p>

      <h2>Conclusion</h2>
      <p>Regular physiotherapy sessions are an investment in your long-term health and well-being. Whether you're dealing with a specific condition or simply want to maintain optimal physical function, physiotherapy offers a holistic approach to health that can benefit everyone.</p>
    `,
  },
  "sports-injury-recovery": {
    title: "Sports Injury Recovery: A Complete Guide",
    image: "/placeholder.jpg",
    category: "Sports Medicine",
    date: "December 10, 2024",
    readTime: "7 min read",
    author: "Dr. Michael Chen",
    content: `
      <p>Sports injuries can be frustrating and challenging, but with the right approach to recovery, you can return to your favorite activities stronger than before. This comprehensive guide will walk you through the essential steps of sports injury rehabilitation.</p>

      <h2>Understanding Common Sports Injuries</h2>
      <p>The most common sports injuries include sprains, strains, knee injuries, shin splints, and tendonitis. Each requires a specific approach to treatment and rehabilitation.</p>

      <h2>The RICE Protocol</h2>
      <p>Immediately after an injury, the RICE protocol is crucial: Rest, Ice, Compression, and Elevation. This helps reduce swelling and pain in the acute phase of injury.</p>

      <h2>Progressive Rehabilitation</h2>
      <p>Recovery should be gradual and progressive. Your physiotherapist will guide you through phases of rehabilitation, starting with gentle movements and gradually increasing intensity as healing progresses.</p>

      <h2>Strength and Conditioning</h2>
      <p>Rebuilding strength is essential for preventing re-injury. Targeted exercises help restore muscle balance and joint stability.</p>

      <h2>Return to Sport Protocol</h2>
      <p>Returning to your sport too quickly can lead to re-injury. A structured return-to-sport program ensures you're fully ready before resuming full activity.</p>

      <h2>Prevention Strategies</h2>
      <p>Learn from your injury. Proper warm-up, cool-down, and conditioning exercises can significantly reduce the risk of future injuries.</p>
    `,
  },
  "posture-correction-tips": {
    title: "10 Essential Tips for Better Posture",
    image: "/placeholder.jpg",
    category: "Prevention",
    date: "December 5, 2024",
    readTime: "4 min read",
    author: "Dr. Emily Roberts",
    content: `
      <p>Good posture is fundamental to overall health, yet many of us struggle with it daily. Here are ten essential tips to improve your posture and prevent long-term health issues.</p>

      <h2>1. Set Up Your Workspace Ergonomically</h2>
      <p>Your desk, chair, and computer should be positioned to support natural posture. Your screen should be at eye level, and your feet should rest flat on the floor.</p>

      <h2>2. Take Regular Breaks</h2>
      <p>Stand up and move every 30 minutes. This prevents muscle fatigue and helps maintain good posture throughout the day.</p>

      <h2>3. Strengthen Your Core</h2>
      <p>A strong core supports your spine and makes maintaining good posture easier. Include core exercises in your daily routine.</p>

      <h2>4. Be Mindful of Your Phone Use</h2>
      <p>Avoid "tech neck" by bringing your phone to eye level rather than looking down at it.</p>

      <h2>5. Sleep Position Matters</h2>
      <p>Use a supportive pillow and mattress. Sleep on your back or side rather than your stomach.</p>

      <h2>6. Stretch Regularly</h2>
      <p>Daily stretching helps maintain flexibility and reduces muscle tension that can affect posture.</p>

      <h2>7. Wear Supportive Footwear</h2>
      <p>Your shoes affect your entire body alignment. Choose supportive shoes over fashion when possible.</p>

      <h2>8. Practice Proper Lifting Techniques</h2>
      <p>Always lift with your legs, not your back. Keep objects close to your body when carrying them.</p>

      <h2>9. Stay Active</h2>
      <p>Regular exercise strengthens the muscles that support good posture.</p>

      <h2>10. Seek Professional Help</h2>
      <p>If you're struggling with posture, a physiotherapist can provide personalized guidance and exercises.</p>
    `,
  },
  "back-pain-relief": {
    title: "Understanding and Managing Lower Back Pain",
    image: "/placeholder.jpg",
    category: "Pain Management",
    date: "November 28, 2024",
    readTime: "6 min read",
    author: "Dr. Sarah Johnson",
    content: `
      <p>Lower back pain is one of the most common health complaints worldwide. Understanding its causes and effective management strategies can help you find relief and prevent future episodes.</p>

      <h2>Common Causes of Lower Back Pain</h2>
      <p>Lower back pain can result from muscle strain, poor posture, herniated discs, arthritis, or structural problems. Identifying the cause is the first step toward effective treatment.</p>

      <h2>When to Seek Medical Attention</h2>
      <p>While most back pain resolves on its own, certain symptoms require immediate medical attention, including severe pain, numbness, or loss of bladder control.</p>

      <h2>Effective Treatment Options</h2>
      <p>Treatment may include physiotherapy, exercise, manual therapy, heat or cold therapy, and in some cases, medication. A comprehensive approach often works best.</p>

      <h2>Exercise for Back Pain</h2>
      <p>Specific exercises can strengthen your back and core muscles, improving support for your spine and reducing pain.</p>

      <h2>Lifestyle Modifications</h2>
      <p>Simple changes like improving your posture, maintaining a healthy weight, and staying active can significantly reduce back pain.</p>

      <h2>Prevention Strategies</h2>
      <p>Regular exercise, proper lifting techniques, and ergonomic workspace setup can help prevent future episodes of back pain.</p>
    `,
  },
  "elderly-mobility": {
    title: "Maintaining Mobility in Your Golden Years",
    image: "/placeholder.jpg",
    category: "Senior Care",
    date: "November 20, 2024",
    readTime: "5 min read",
    author: "Dr. Michael Chen",
    content: `
      <p>Aging doesn't have to mean losing your independence or mobility. With the right approach, you can stay active, strong, and mobile well into your golden years.</p>

      <h2>The Importance of Staying Active</h2>
      <p>Regular physical activity is crucial for maintaining strength, balance, and flexibility as we age. It also helps prevent falls and maintains independence.</p>

      <h2>Safe Exercise for Seniors</h2>
      <p>Low-impact exercises like walking, swimming, and tai chi are excellent for seniors. They improve fitness without putting excessive stress on joints.</p>

      <h2>Balance Training</h2>
      <p>Balance exercises are essential for fall prevention. Simple exercises can significantly improve stability and confidence.</p>

      <h2>Strength Training</h2>
      <p>Maintaining muscle mass is crucial as we age. Gentle strength training helps preserve muscle and bone density.</p>

      <h2>Flexibility Work</h2>
      <p>Regular stretching maintains range of motion and makes daily activities easier and more comfortable.</p>

      <h2>Working with a Physiotherapist</h2>
      <p>A physiotherapist can design a personalized program that addresses your specific needs and limitations while helping you achieve your mobility goals.</p>
    `,
  },
  "rehabilitation-exercises": {
    title: "Top 5 Rehabilitation Exercises for Knee Pain",
    image: "/placeholder.jpg",
    category: "Rehabilitation",
    date: "November 15, 2024",
    readTime: "8 min read",
    author: "Dr. Emily Roberts",
    content: `
      <p>Knee pain can be debilitating, but the right exercises can help strengthen the joint, reduce pain, and improve function. Here are five evidence-based rehabilitation exercises recommended by physiotherapy experts.</p>

      <h2>1. Straight Leg Raises</h2>
      <p>This exercise strengthens the quadriceps without putting stress on the knee joint. Lie on your back, keep one leg bent and the other straight, then lift the straight leg to the height of the bent knee.</p>

      <h2>2. Wall Squats</h2>
      <p>Wall squats build strength in the quadriceps and glutes while maintaining proper alignment. Stand with your back against a wall and slowly slide down into a squat position.</p>

      <h2>3. Step-Ups</h2>
      <p>Step-ups improve strength and stability. Start with a low step and gradually increase height as you get stronger.</p>

      <h2>4. Hamstring Curls</h2>
      <p>Strong hamstrings support the knee joint. Stand and bend your knee, bringing your heel toward your buttocks.</p>

      <h2>5. Calf Raises</h2>
      <p>Calf strength is important for knee stability. Stand and rise up onto your toes, then slowly lower back down.</p>

      <h2>Important Considerations</h2>
      <p>Always start slowly and stop if you experience sharp pain. Consult with a physiotherapist before beginning any new exercise program, especially if you have a knee injury.</p>

      <h2>Progression and Consistency</h2>
      <p>Consistency is key. Perform these exercises regularly, and gradually increase repetitions and resistance as your strength improves.</p>
    `,
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogContent[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-[#2e3192] to-[#4c46a3]">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-96 overflow-hidden"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>

      {/* Article Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Article Header */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="mb-6 -ml-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            <div className="mb-6">
              <span className="bg-[#2e3192] text-white px-4 py-2 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6 pb-6 border-b">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="mb-8"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    url: window.location.href,
                  });
                }
              }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>

            {/* Article Body */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                lineHeight: "1.8",
              }}
            />
          </div>

          {/* Related Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Continue Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(blogContent)
                .filter(([key]) => key !== slug)
                .slice(0, 2)
                .map(([key, relatedPost]) => (
                  <Link key={key} href={`/blog/${key}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all"
                    >
                      <span className="text-sm text-[#2e3192] font-medium">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{relatedPost.date}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </motion.div>
        </motion.article>
      </div>

      <Footer />

      <style jsx global>{`
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose p {
          color: #4b5563;
          margin-bottom: 1.5rem;
        }
        .prose ul,
        .prose ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
          color: #4b5563;
        }
      `}</style>
    </div>
  );
}
