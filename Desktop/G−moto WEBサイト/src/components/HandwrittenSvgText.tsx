import React, { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface HandwrittenSvgTextProps {
  text1: string;
  text2?: string;
  className?: string;
}

const HandwrittenSvgText: React.FC<HandwrittenSvgTextProps> = ({ 
  text1, 
  text2, 
  className = '' 
}) => {
  // 文字ごとに分割
  const characters1 = text1.split('');
  const characters2 = text2 ? text2.split('') : [];
  
  // アニメーションコントロールを初期化
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();
  
  // リセットと再生のタイミングを管理
  const [isAnimating, setIsAnimating] = useState(true);
  
  // アニメーションのリセットと再生を制御
  useEffect(() => {
    const startAnimation = async () => {
      // 全ての文字を非表示に
      await controls1.start('hidden');
      if (text2) await controls2.start('hidden');
      
      // 少し間を空けてからアニメーション開始
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 1行目のアニメーション
      await controls1.start('visible');
      
      // 2行目があればアニメーション
      if (text2) await controls2.start('visible');
      
      // アニメーション完了後、少し待ってからリセット
      const totalDuration = (characters1.length + (characters2.length || 0)) * 0.25 + 3;
      setTimeout(() => {
        if (isAnimating) startAnimation();
      }, totalDuration * 1000);
    };
    
    if (isAnimating) startAnimation();
    
    return () => setIsAnimating(false);
  }, [controls1, controls2, characters1.length, characters2.length, text2, isAnimating]);

  // 文字のアニメーション設定
  const characterAnimation = {
    hidden: { 
      opacity: 0,
      strokeDashoffset: 100,
      strokeDasharray: 100
    },
    visible: (i: number) => ({
      opacity: 1,
      strokeDashoffset: 0,
      transition: {
        opacity: {
          delay: i * 0.25,
          duration: 0.2
        },
        strokeDashoffset: {
          delay: i * 0.25,
          duration: 1.2,
          ease: "easeInOut"
        }
      }
    })
  };

  return (
    <div className={`${className} relative`}>
      <svg
        className="w-full h-auto"
        viewBox="0 0 1000 350"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.7))' }}
      >
        {/* 1行目の文字を一文字ずつ表示 */}
        <g>
          {characters1.map((char, index) => (
            <motion.text
              key={`line1-${index}`}
              fill="white"
              stroke="white"
              strokeWidth="1"
              fontSize="72"
              fontFamily="'Zen Maru Gothic', 'Klee One', cursive"
              letterSpacing="0.1em"
              fontWeight="500"
              x={80 + index * 75} // 文字間隔を調整
              y="100"
              initial="hidden"
              animate={controls1}
              custom={index}
              variants={characterAnimation}
              style={{ filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5))' }}
            >
              {char}
            </motion.text>
          ))}
        </g>
        
        {/* 2行目の文字を一文字ずつ表示 */}
        {text2 && (
          <g>
            {characters2.map((char, index) => (
              <motion.text
                key={`line2-${index}`}
                fill="white"
                stroke="white"
                strokeWidth="1"
                fontSize="72"
                fontFamily="'Zen Maru Gothic', 'Klee One', cursive"
                letterSpacing="0.1em"
                fontWeight="500"
                x={160 + index * 75} // 2行目は右にずらす
                y="210"
                initial="hidden"
                animate={controls2}
                custom={characters1.length + index + 2} // 行間の間隔を少し広げる
                variants={characterAnimation}
                style={{ filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5))' }}
              >
                {char}
              </motion.text>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};

export default HandwrittenSvgText;
