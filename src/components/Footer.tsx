import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
    const fadeIn = {
        hidden: {
            opacity: 0,
            y: 20
        },

        visible: {
            opacity: 1,
            y: 0
        }
    };

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    <motion.div variants={fadeIn}>
                        <Link
                            to="/"
                            className="text-2xl font-light tracking-wide text-white mb-6 inline-block">Sweet<span className="font-medium">Delights</span>
                        </Link>
                        <p className="text-gray-400 mb-6 leading-relaxed max-w-xs">为您的特殊时刻提供精致美味的甜品解决方案，让每一刻都充满甜蜜回忆。
                                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                                <i className="fa-brands fa-weixin text-xl"></i>
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                                <i className="fa-brands fa-weibo text-xl"></i>
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-amber-500 transition-colors duration-300">
                                <i className="fa-brands fa-instagram text-xl"></i>
                            </a>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeIn}>
                        <h4 className="text-lg font-semibold text-white mb-6">快速链接</h4>
                        <ul className="space-y-4">
                            <li><Link
                                    to="/"
                                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 inline-block transform hover:-translate-y-1">首页</Link></li>
                            <li><Link
                                    to="/about"
                                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 inline-block transform hover:-translate-y-1">关于我们</Link></li>
                            <li><Link
                                    to="/contact"
                                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 inline-block transform hover:-translate-y-1">联系方式</Link></li>
                            <li><Link
                                    to="/booking"
                                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 inline-block transform hover:-translate-y-1">在线预订</Link></li>
                        </ul>
                    </motion.div>
                    <motion.div variants={fadeIn}>
                        <h4 className="text-lg font-semibold text-white mb-6">产品分类</h4>
                        <ul className="space-y-4">
                            <li><Link
                                    to="/categories/dessert-table"
                                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 inline-block transform hover:-translate-y-1">甜品台</Link></li><li><Link
                                    to="/categories/business-tea"
                                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 inline-block transform hover:-translate-y-1">商务茶歇</Link></li>
                            <li><Link
                                    to="/categories/baby-birthday"
                                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 inline-block transform hover:-translate-y-1">宝宝生日宴甜品台</Link></li>
                            <li><Link
                                    to="/categories/wedding"
                                    className="text-gray-400 hover:text-amber-500 transition-colors duration-300 inline-block transform hover:-translate-y-1">婚宴甜品台</Link></li>
                        </ul>
                    </motion.div>
                    <motion.div variants={fadeIn}>
                        <h4 className="text-lg font-semibold text-white mb-6">联系我们</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start">
                                <i className="fa-solid fa-map-marker-alt mt-1 mr-3 text-amber-500"></i>
                                <span>服务范围：成都市区以及周边片区</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fa-solid fa-phone mr-3 text-amber-500"></i>
                                <span>138 8069 2892&nbsp;</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fa-solid fa-envelope mr-3 text-amber-500"></i>
                                <span>1185661999@qq.com</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fa-solid fa-clock mr-3 text-amber-500"></i>
                                <span>周一至周日 9:00-18:00</span>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>
                <div className="border-t border-gray-800 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">© {new Date().getFullYear()}SweetDelights 甜品店. 保留所有权利.</p>
                        <div className="flex space-x-6">
                            <Link
                                to="#"
                                className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300">隐私政策</Link>
                            <Link
                                to="#"
                                className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300">服务条款</Link>
                            <Link
                                to="#"
                                className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-300">Cookie政策</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}