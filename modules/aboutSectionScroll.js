import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

const aboutSectionScroll = {
    setup: function() {
        console.log("Setting up about section scroll animation");
        gsap.from(".about-section-title", {
            y: 100,
            opacity: 0,
            rotateX: -90,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".about-section-title",
                start: "top 20%",
                end: "top -40%",
                scrub: true,
                toggleActions: "play none none reverse",
            }
        });

        document.querySelectorAll(".about-section p").forEach((paragraph) => {
            gsap.from(paragraph, {
                y: 100,
                opacity: 0,
                rotateX: -90,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: paragraph,
                    start: "top 20%",
                    end: "top -40%",
                    scrub: true,
                    toggleActions: "play none none reverse",
                }
            });
        });
    }
};

export default aboutSectionScroll;