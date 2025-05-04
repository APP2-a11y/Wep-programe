document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after page load
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Animate Elements on Scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-text, .animate-btn, .timeline-container');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                element.classList.add('show');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate Skill Bars
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    // Trigger animation when skills section is visible
    const skillsSection = document.querySelector('.about-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Download CV Functionality
    const downloadCvBtns = document.querySelectorAll('#download-cv-btn, #secondary-download-cv');
    
    downloadCvBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a temporary link to download the CV file
            const link = document.createElement('a');
            link.href = 'assets/cv.txt'; // Path to your CV file
            link.download = 'cv.txt'; // Name of the downloaded file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Optional: Show a download confirmation
            const downloadConfirmation = document.createElement('div');
            downloadConfirmation.textContent = 'جاري تنزيل السيرة الذاتية...';
            downloadConfirmation.style.position = 'fixed';
            downloadConfirmation.style.bottom = '20px';
            downloadConfirmation.style.left = '50%';
            downloadConfirmation.style.transform = 'translateX(-50%)';
            downloadConfirmation.style.backgroundColor = '#4e54c8';
            downloadConfirmation.style.color = 'white';
            downloadConfirmation.style.padding = '10px 20px';
            downloadConfirmation.style.borderRadius = '5px';
            downloadConfirmation.style.zIndex = '1000';
            downloadConfirmation.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
            document.body.appendChild(downloadConfirmation);
            
            setTimeout(() => {
                downloadConfirmation.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(downloadConfirmation);
                }, 500);
            }, 3000);
        });
    });

    // WhatsApp Contact Form
    const whatsappForm = document.getElementById('whatsapp-form');
    
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Format the WhatsApp message
            const whatsappMessage = 
                `*رسالة جديدة من الموقع الشخصي*\n\n` +
                `*الاسم:* ${name}\n` +
                `*البريد الإلكتروني:* ${email}\n` +
                `*الموضوع:* ${subject}\n\n` +
                `*الرسالة:*\n${message}`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Replace with your WhatsApp number (with country code but without + or 00)
            const whatsappNumber = '1234567890';
            
            // Open WhatsApp with the message
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
            
            // Optional: Show a success message
            const successMsg = document.createElement('div');
            successMsg.textContent = 'سيتم توجيهك إلى واتساب لإكمال الرسالة';
            successMsg.style.position = 'fixed';
            successMsg.style.bottom = '20px';
            successMsg.style.left = '50%';
            successMsg.style.transform = 'translateX(-50%)';
            successMsg.style.backgroundColor = '#25D366';
            successMsg.style.color = 'white';
            successMsg.style.padding = '10px 20px';
            successMsg.style.borderRadius = '5px';
            successMsg.style.zIndex = '1000';
            successMsg.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(successMsg);
                }, 500);
            }, 3000);
            
            // Reset the form
            whatsappForm.reset();
        });
    }

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Initialize animations
    function initAnimations() {
        // Animate hero elements
        setTimeout(() => {
            document.querySelectorAll('.animate-text').forEach(el => {
                el.classList.add('show');
            });
        }, 500);
        
        setTimeout(() => {
            document.querySelectorAll('.animate-btn').forEach(el => {
                el.classList.add('show');
            });
        }, 800);
    }
    
    initAnimations();
});
// sdfagksprogk'sfogks;fkg;lzsdfgklzs
// في قسم Animate Elements on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.timeline-container');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementPosition < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = 'opacity 0.8s, transform 0.8s';
        }
    });
};

// تأكد من استدعاء هذه الدالة عند التحميل والتمرير
window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // تشغيلها فوراً عند التحميل