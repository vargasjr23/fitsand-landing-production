import React from 'react';

export const ImageAutoSlider = ({ whatsappNumber }) => {
  // To use your own images, simply drop photos into the "public" folder 
  // named exactly "comunidad-1.jpg" through "comunidad-5.jpg".
  // If they aren't found, the code gracefully falls back to the original Unsplash placeholders.
  const images = [
    {
      local: "/comunidad-1.jpg",
      fallback: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgnboUh4OzvSg1CDEHRnnJB5bmJgkOwh2zt8qxnN2wPl9WyEqkVVaV-T6IabzY1XGx3UH7vEWx6ENVOj6lwK74Manj_YQHlG6ksvAiisSn4FNqEaPojqDAq0DmhVukNdD9kjuijV-xUHxtqgT2ywDvMJ3Da7JbQolQANraGW8YY0oG24e8oA-p9_2isvmbumGfKF4ObD3Wo7Pve90vyeDJ9KdfwgnpauiwssAhcIWgZXJop_cacXvzhWdLIWRWjpcP5oY-0wqSsuI"
    },
    {
      local: "/comunidad-2.jpg",
      fallback: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOvg3qeuQxpdvp5V-PU_uthnJWLu26XWzPL9TFPjp7UAs3ycSN8bmpYVvQ_QND8k0n7t1eZsOQOnAL4RctEadiIsGhnqctk6wKBty5zEZaaG_DDS-Wp_tsO1N_EBg15nCY3UufLhpu3lK3unVKk2vwPF65Vnf0YcrDR17BVv6uYamLNmKFIhKYYVmWzsqYb0vYoZSE3a42SM3d0yWzK4IMr_dAEtiEsO5AeR3kIM9M36s6crVf-j6vvmbjYRN4ORTIF_QGfEXJOKA"
    },
    {
      local: "/comunidad-3.jpg",
      fallback: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6MEyXb2CCIiG6vvO6tu35Cr40KthiQhGR9vlKN5Fu5Hf4LZHm0LYM7akOA8JMthFAJI9I5rVqyOfljL5TwD1NhAMtaNd5ul1AMWXgVTfKZVqqwlJojE-GlG8cSPD2ZyNqBNYG_hgf85C1cVSMm6Y88CCIIp2FKo1ui6hm_99v9pVzS40YNeP8ReZnBaek485113h2VK9S-5a5B4YrrMYBp6u41-jRF9lQL-L9IBh1Pezk-TSCPnzIyE8S8SQ_t7gNJdgVKIfzNNY"
    },
    {
      local: "/comunidad-4.jpg",
      fallback: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNy2pVabRZxx01WVc6XynGVHereyqmPlPNqKt4x84zIcMdsqGpnI-ItZq0grZ4Xms-YH_w80J_gHYp_6-s-sHGw1cFwVTQjiPwPmlVOh0CjJY6H6Mhvh5n06qeWwA6JGw55wUMAptV9qq_uJ3zHvVcGQ0NTT43rGHmvPll2RYIVqh4YF6x_NOKQ9gis9HH9wUUKfhleCAbfLMPH9-vjI76l21j-q0gyomF49nThrOsYupC3DYQEGs_RjeexAC2q3Bk1VXK-APM0J8"
    },
    {
      local: "/comunidad-5.jpg",
      fallback: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOklkQqOEIWZ3wF6ZijheFOj6fVyyvByseZCjS6mhQkSE2zD6qM0VN-P_DIsv803RwoKb6XtF9EcV-Y2ZtRRVpk2S7l2XK8f6Yyc4OG127ClFa-ZYQ2zt49hobjaJ84HopU00S0msdy3YHVaMXLilfUCQiuEH5bN1vOD6JbYq4owO2lYM2oPwROIfz3kjb9COtLRuOv8-x4nRh9VPoNxKz0GFuhxgXm39MPxWj2bJiHcW9VCHlPsYHCxxPpqcvfEKDtnxD9Rx8vz4"
    }
  ];

  // Duplicate images multiple times for seamless loop given the 5 images
  const duplicatedImages = [...images, ...images, ...images, ...images];

  return (
    <div className="w-full relative overflow-hidden flex items-center justify-center py-4">
      <div className="relative z-10 w-full flex items-center justify-center">
        <div className="scroll-container w-full max-w-[100vw]">
          <div className="infinite-scroll flex gap-6 w-max">
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="image-item group flex-shrink-0 w-[280px] h-[350px] md:w-[320px] md:h-[400px] rounded-lg overflow-hidden shadow-md relative"
              >
                <img
                  src={image.local}
                  onError={(e) => {
                    e.currentTarget.onerror = null; 
                    e.currentTarget.src = image.fallback;
                  }}
                  alt={`Comunidad Fitsand ${(index % images.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Fitsand Specific Overlay */}
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-white p-6 z-20">
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-sm text-[11px] font-body tracking-[0.1em] uppercase hover:bg-white hover:text-stone-900 transition-all duration-300">Shop the Look</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
