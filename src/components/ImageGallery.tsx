import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  showCategories?: boolean;
  showLightbox?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  columns = 3,
  showCategories = true,
  showLightbox = true
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 获取所有分类
  const categories = ['all', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))];

  // 过滤图片
  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory);

  // 网格列数类名
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;

      switch (e.key) {
        case 'Escape':
          setLightboxImage(null);
          break;
        case 'ArrowLeft':
          navigateImage(-1);
          break;
        case 'ArrowRight':
          navigateImage(1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, currentImageIndex]);

  // 导航到上一张/下一张图片
  const navigateImage = (direction: number) => {
    const newIndex = currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < filteredImages.length) {
      setCurrentImageIndex(newIndex);
      setLightboxImage(filteredImages[newIndex]);
    }
  };

  // 打开灯箱
  const openLightbox = (image: GalleryImage) => {
    if (!showLightbox) return;
    const index = filteredImages.findIndex(img => img.id === image.id);
    setCurrentImageIndex(index);
    setLightboxImage(image);
  };

  return (
    <div className="w-full">
      {/* 分类过滤器 */}
      {showCategories && categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white shadow-glow'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              {category === 'all' ? '全部' : category}
            </motion.button>
          ))}
        </div>
      )}

      {/* 图片网格 */}
      <motion.div
        layout
        className={`grid ${gridClasses[columns]} gap-4`}
      >
        <AnimatePresence>
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4 }}
              className="group cursor-pointer"
              onClick={() => openLightbox(image)}
            >
              <div className="relative overflow-hidden rounded-xl bg-neutral-100 aspect-square">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* 悬浮遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    {image.title && (
                      <h3 className="text-white font-semibold text-sm mb-1">
                        {image.title}
                      </h3>
                    )}
                    {image.description && (
                      <p className="text-white/90 text-xs line-clamp-2">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* 放大图标 */}
                {showLightbox && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                    <i className="fa-solid fa-expand text-neutral-700 text-sm"></i>
                  </div>
                )}

                {/* 分类标签 */}
                {image.category && (
                  <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {image.category}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 灯箱模态框 */}
      <AnimatePresence>
        {lightboxImage && showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 主图片 */}
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* 图片信息 */}
              {(lightboxImage.title || lightboxImage.description) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  {lightboxImage.title && (
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {lightboxImage.title}
                    </h3>
                  )}
                  {lightboxImage.description && (
                    <p className="text-white/90 text-sm">
                      {lightboxImage.description}
                    </p>
                  )}
                </div>
              )}

              {/* 导航按钮 */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage(-1)}
                    disabled={currentImageIndex === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button
                    onClick={() => navigateImage(1)}
                    disabled={currentImageIndex === filteredImages.length - 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </>
              )}

              {/* 关闭按钮 */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <i className="fa-solid fa-times"></i>
              </button>

              {/* 图片计数 */}
              {filteredImages.length > 1 && (
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                  {currentImageIndex + 1} / {filteredImages.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;