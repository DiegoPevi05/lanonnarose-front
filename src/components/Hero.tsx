import {motion} from 'framer-motion';
import { styles } from '../styles';
import {CakeCanvas} from '../components/canvas';
import { staggerContainer, slideIn } from "../lib/motions";
import Link from '../components/ui/Link';
import { Phone, ClipboardList } from 'lucide-react';
import {useTranslation} from 'react-i18next'
import { webContentLanguage } from "../interfaces";


interface HeroCompProps {
  webContent: webContentLanguage[];
}

const Hero = (props:HeroCompProps) => {
  const {webContent} = props;
  const { t, i18n } = useTranslation();
  return(
      <motion.section 
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className="relative w-full h-[700px] mx-auto overflow-hidden">
        <motion.div 
          variants={slideIn("left", "tween", 0.2, 1)}
          className={`${styles.paddingX} absolute inset-0 top-[60px] max-w-7xl mx-auto flex flex-row items-start gap-5 z-50`}>

          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-primary"/>
            <div className="w-1 sm:h-80 h-40 bg-primary"/>
          </div>

          <div>
            <h1 className={`${styles.heroHeadText} text-white`}>
              {t("Hi, I'm")} <span className='text-primary'>La Nonna Rose</span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100 w-[200px] sm:w-[400px]`}>
              {t('Welcome to my Page')}<br className='sm:block hidden' />
              {webContent?.find((item) => item.language === i18n.language)?.content.find((item) => item.name === "HeroDescription")?.content ?? ''}
            </p>
            <div className="flex flex-row mt-8 sm:mt-5 gap-5">
              <Link className="text-sm sm:text-md gap-2" href="#catalog"><ClipboardList/>{t('See Catalog')}</Link>
              <Link className="text-sm sm:text-md gap-2" href="https://api.whatsapp.com/send?phone=19162892853&text=Hola%20Nonna%20Rose" target="_blank"><Phone/>{t('Send Message')}</Link>
            </div>
          </div>
        </motion.div>
        <motion.div 
          variants={slideIn("right", "tween", 2, 1.5)}
          className="w-full h-full z-0">
          <CakeCanvas/>
        </motion.div>
      </motion.section>
  )
}

export default Hero;
