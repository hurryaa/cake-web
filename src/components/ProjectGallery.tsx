import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lazyLoadImage } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

export interface ProjectDetail {
  id: number;
  title: string;
  theme: string;
  guestCount: string;
  budget: string;
  duration: string;
  description: string;
  images: string[];
  features: string[];
  tags?: string[];
}

interface ProjectGalleryProps {
  projects: ProjectDetail[];
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openProject = (project: ProjectDetail) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length
      );
    }
  };

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card
              variant="hover"
              className="group cursor-pointer overflow-hidden"
              onClick={() => openProject(project)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  {...lazyLoadImage({
                    src: project.images[0],
                    alt: project.title,
                    className:
                      "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110",
                  })}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm font-medium opacity-90">{project.theme}</p>
                    <p className="text-xs opacity-75">
                      {project.guestCount} · {project.duration}
                    </p>
                  </div>
                </div>
                {project.tags && project.tags.length > 0 && (
                  <div className="absolute left-4 top-4 flex gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-800 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 transition-colors group-hover:text-primary-600">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{project.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-neutral-50 p-3">
                    <p className="text-xs text-neutral-500">活动人数</p>
                    <p className="mt-1 font-semibold text-neutral-900">{project.guestCount}</p>
                  </div>
                  <div className="rounded-lg bg-neutral-50 p-3">
                    <p className="text-xs text-neutral-500">人均预算</p>
                    <p className="mt-1 font-semibold text-primary-600">{project.budget}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-800"
                >
                  查看详情 <i className="fa-solid fa-arrow-right text-xs" />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={closeProject}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeProject}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-lg transition-all hover:bg-white hover:scale-110"
              >
                <i className="fa-solid fa-times" />
              </button>

              <div className="relative h-[50vh] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>

                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-lg transition-all hover:scale-110 hover:bg-white"
                    >
                      <i className="fa-solid fa-chevron-left" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-lg transition-all hover:scale-110 hover:bg-white"
                    >
                      <i className="fa-solid fa-chevron-right" />
                    </button>
                  </>
                )}
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-semibold text-neutral-900">
                    {selectedProject.title}
                  </h2>
                  <p className="mt-2 text-lg text-neutral-600">{selectedProject.description}</p>
                </div>

                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl border border-neutral-200 bg-gradient-to-br from-primary-50 to-white p-4">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                      <i className="fa-solid fa-palette" />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      活动主题
                    </p>
                    <p className="mt-1 text-lg font-semibold text-neutral-900">
                      {selectedProject.theme}
                    </p>
                  </div>

                  <div className="rounded-xl border border-neutral-200 bg-gradient-to-br from-blue-50 to-white p-4">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <i className="fa-solid fa-users" />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      活动人数
                    </p>
                    <p className="mt-1 text-lg font-semibold text-neutral-900">
                      {selectedProject.guestCount}
                    </p>
                  </div>

                  <div className="rounded-xl border border-neutral-200 bg-gradient-to-br from-amber-50 to-white p-4">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <i className="fa-solid fa-wallet" />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      人均预算
                    </p>
                    <p className="mt-1 text-lg font-semibold text-neutral-900">
                      {selectedProject.budget}
                    </p>
                  </div>

                  <div className="rounded-xl border border-neutral-200 bg-gradient-to-br from-green-50 to-white p-4">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <i className="fa-solid fa-clock" />
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      活动时长
                    </p>
                    <p className="mt-1 text-lg font-semibold text-neutral-900">
                      {selectedProject.duration}
                    </p>
                  </div>
                </div>

                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-neutral-900">服务亮点</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                            <i className="fa-solid fa-check text-xs text-primary-600" />
                          </div>
                          <p className="text-sm text-neutral-700">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-medium text-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
