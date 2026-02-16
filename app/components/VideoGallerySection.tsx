"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Video,
  Clock,
  User,
} from "lucide-react";
import { BACKEND_URL } from "@/lib/config";
import { Button } from "@/components/ui/button";

interface Testimonial {
  _id: string;
  profileMedia: string;
  mediaType: string;
  bannerMedia?: string;
  bannerMediaType?: string;
  fullName: string;
  role: string;
  rating: number;
  testimonial: string;
  service: string;
  date: string;
  published: boolean;
}

const VideoGallerySection = () => {
  const [videos, setVideos] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/testimonials`);
        const data = await response.json();
        const videoTestimonials = (data.testimonials || []).filter(
          (t: Testimonial) => t.bannerMediaType === "video",
        );
        setVideos(videoTestimonials);
      } catch (error) {
        console.error("Error fetching video tutorials:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const getMediaUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${BACKEND_URL}${path}`;
  };

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  if (isLoading || videos.length === 0) {
    if (isLoading) {
      return (
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="h-96 w-full bg-gray-200 animate-pulse rounded-[2.5rem]" />
          </div>
        </section>
      );
    }
    return null;
  }

  const currentVideo = videos[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2e3192]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-[#2e3192] text-white hover:bg-[#1a1c3d] mb-4 py-1.5 px-6 rounded-full text-sm font-semibold tracking-wide shadow-lg shadow-blue-900/10">
              Video Gallery
            </Badge>
            <h2 className="text-4xl font-bold text-[#1a1c3d] mb-6">
              Quick Exercise Tutorials
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Watch short, effective exercise demonstrations and physiotherapy
              tips from our expert team to help you recover faster and stay
              active.
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid lg:grid-cols-12 gap-8 items-center"
            >
              {/* Video Player Section */}
              <div className="lg:col-span-8">
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/20 group bg-black">
                  <video
                    ref={videoRef}
                    src={getMediaUrl(currentVideo.bannerMedia || "")}
                    className="w-full h-full object-contain bg-black"
                    controls
                    poster={getMediaUrl(currentVideo.profileMedia)}
                  />

                  {/* Custom Overlay for pause/play would go here, using default for now for better ux */}
                </div>
              </div>

              {/* Info Section */}
              <div className="lg:col-span-4 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-8 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-blue-50"
                >
                  <div className="flex items-center gap-2 mb-6 text-[#2e3192]">
                    <Video className="w-5 h-5" />
                    <span className="text-sm font-bold uppercase tracking-wider">
                      Now Playing
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1a1c3d] mb-4">
                    {currentVideo.service}
                  </h3>

                  <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-2xl">
                    <img
                      src={getMediaUrl(currentVideo.profileMedia)}
                      alt={currentVideo.fullName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <p className="font-bold text-[#1a1c3d] text-sm">
                        {currentVideo.fullName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {currentVideo.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-8 italic">
                    "
                    {currentVideo.testimonial.length > 150
                      ? currentVideo.testimonial.substring(0, 150) + "..."
                      : currentVideo.testimonial}
                    "
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={prevVideo}
                        className="rounded-xl border-gray-200 hover:border-[#2e3192] hover:text-[#2e3192]"
                        disabled={videos.length <= 1}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={nextVideo}
                        className="rounded-xl border-gray-200 hover:border-[#2e3192] hover:text-[#2e3192]"
                        disabled={videos.length <= 1}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                    <span className="text-sm font-medium text-gray-400">
                      {currentIndex + 1} / {videos.length}
                    </span>
                  </div>
                </motion.div>

                {/* Thumbnails list */}
                {videos.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {videos.map((vid, idx) => (
                      <button
                        key={vid._id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden transition-all duration-300 ${
                          idx === currentIndex
                            ? "ring-2 ring-[#2e3192] ring-offset-2 scale-105"
                            : "opacity-50 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={getMediaUrl(vid.profileMedia)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default VideoGallerySection;
