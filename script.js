const mobile_menu = document.querySelector(".mobile_nav");
const menu_btn = document.querySelector(".mobile_menu_icon");
const close_btn = document.querySelector(".close_menu_btn");

//open mobile menu
function openMobileMenu(){
    mobile_menu.style.display = 'flex'
}

//close mobile menu
function closeMobileMenu(){
    mobile_menu.style.display = 'none'
}

// //faq-section
// document.addEventListener('DOMContentLoaded', () => {
//   const faqQuestions = document.querySelectorAll('.faq-question');

//   faqQuestions.forEach(question => {
//     question.addEventListener('click', () => {
//       const faqItem = question.closest('.faq-item');

//       // Close all other active FAQ items
//       document.querySelectorAll('.faq-item.active').forEach(activeItem => {
//         if (activeItem !== faqItem) { // Don't close the currently clicked item
//           activeItem.classList.remove('active');
//           activeItem.querySelector('.toggle-icon').textContent = '+';
//         }
//       });

//       // Toggle the clicked FAQ item
//       faqItem.classList.toggle('active');

//       const toggleIcon = question.querySelector('.toggle-icon');
//       if (faqItem.classList.contains('active')) {
//         toggleIcon.textContent = '×';
//       } else {
//         toggleIcon.textContent = '+';
//       }
//     });
//   });
// });

// //Footer
// /* * Function to update the copyright year in the footer
//   * It replaces the year in the text content of the element with ID 'copyrightStatement'
//   * If the element is not found, it logs a warning to the console.
//  */
// function updateCopyrightYear() {
//   const copyrightElement = document.getElementById('copyrightStatement');
//   if (copyrightElement) {
//     const currentYear = new Date().getFullYear();
//     // Regular expression to find a 4-digit year after "&copy; "
//     const updatedText = copyrightElement.textContent.replace(/© \d{4}/, `© ${currentYear}`);
//     copyrightElement.textContent = updatedText;
//   } else {
//     console.warn("Copyright element with ID 'copyrightStatement' not found.");
//   }
// }

// // Call the function when the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', updateCopyrightYear);

document.addEventListener('DOMContentLoaded', () => {

    // --- Your Existing JavaScript Functions (Mobile Menu, FAQ, Copyright) ---
    // function openMobileMenu() {
    //     document.querySelector('.mobile_nav').classList.add('open');
    // }

    // function closeMobileMenu() {
    //     document.querySelector('.mobile_nav').classList.remove('open');
    // }

    // FAQ Toggling Logic (from previous responses)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                if (activeItem !== faqItem) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.toggle-icon').textContent = '+';
                }
            });
            faqItem.classList.toggle('active');
            const toggleIcon = question.querySelector('.toggle-icon');
            if (faqItem.classList.contains('active')) {
                toggleIcon.textContent = '×';
            } else {
                toggleIcon.textContent = '+';
            }
        });
    });

    // Copyright Year Update (from previous responses)
    function updateCopyrightYear() {
        const copyrightElement = document.getElementById('copyrightStatement');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            const updatedText = copyrightElement.textContent.replace(/© \d{4}/, `© ${currentYear}`);
            copyrightElement.textContent = updatedText;
        } else {
            console.warn("Copyright element with ID 'copyrightStatement' not found.");
        }
    }
    updateCopyrightYear(); // Call it immediately on DOMContentLoaded


    // --- GSAP Scroll-Based Animations ---

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Entrance Animation
    gsap.from(".hero_content h1", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    });
    gsap.from(".hero_content p", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2, // Stagger slightly after h1
        ease: "power3.out"
    });
    gsap.from(".hero_content .secondary_btn", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.4, // Stagger after p
        ease: "power3.out"
    });
    gsap.from(".hero_content img", { // Assuming 'Powering the future.png' is in hero_content
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 0.6,
        ease: "back.out(1.7)"
    });

    // Social Proof Section - Sponsors Fade In
    gsap.from(".sponsor_logos img", {
        opacity: 0,
        y: 20,
        stagger: 0.1, // Each logo fades in slightly after the previous one
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".social_proof .sponsor_logos",
            start: "top 85%", // Animation starts when 85% of the trigger is visible
            toggleActions: "play none none none" // Play once
        }
    });

    // How It Works Section - Steps Slide Up
    gsap.from(".how_it_works .step", {
        opacity: 0,
        y: 50,
        stagger: 0.2, // Each step slides up
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
            trigger: ".how_it_works .steps",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    // Add a parallax effect to the steps_img
    gsap.from(".how_it_works .steps_img", {
        y: 100, // Move 100px down initially
        ease: "none", // No easing for parallax effect
        scrollTrigger: {
            trigger: ".how_it_works",
            start: "top bottom", // Start when the top of section enters viewport from bottom
            end: "bottom top",   // End when the bottom of section leaves viewport from top
            scrub: true,         // Link animation directly to scroll progress
            markers: false       // Set to true for debugging scroll positions
        }
    });

    // Our Mission Section - Text Fade In/Slide
    gsap.from(".mission h2", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".mission h2",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
    gsap.from(".mission .faded_text", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".mission .faded_text",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    // About Us Section - Content Fade In
    gsap.from(".about_us .about_content h2", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".about_us .about_content",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    gsap.from(".about_us .about_content p", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".about_us .about_content",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    gsap.from(".about_us .secondary_btn", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".about_us .about_content",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });


    // Team Section - Team Members Slide In
    gsap.from(".team_member", {
        opacity: 0,
        y: 100,
        scale: 0.8,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: {
            trigger: ".team_profiles_wrapper",
            start: "top 75%", // Adjust as needed
            toggleActions: "play none none none"
        }
    });

    // Mission Statement Section - Big Text Entrance
    gsap.from(".mission_statement h3", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".mission_statement h3",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
    gsap.from(".mission_statement .accent_btn", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".mission_statement h3", // Use h3 as trigger for button too
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    // Blog Articles - Fade In
    gsap.from(".blog_articles .article_blob", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".blog_articles",
            start: "top 75%",
            toggleActions: "play none none none"
        }
    });

    // Join Waitlist Section - Image Slide In
    gsap.from(".join_waitlist_section .waitlist_img", {
        x: 100, // Slides from right
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".join_waitlist_section",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    gsap.from(".join_waitlist_section .input_area h3", {
        x: -50, // Slides from left
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".join_waitlist_section",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    gsap.from(".join_waitlist_section .input_area p", {
        x: -50, // Slides from left
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".join_waitlist_section",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    gsap.from(".join_waitlist_section .input_field", {
        x: -50, // Slides from left
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".join_waitlist_section",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
});