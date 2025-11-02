 window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = 'var(--bg-darker)';
                navbar.style.backdropFilter = 'none';
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // FAQ Toggle Function
        function toggleFAQ(element) {
            const answer = element.nextElementSibling;
            const icon = element.querySelector('i');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-answer').forEach(item => {
                if (item !== answer) {
                    item.classList.remove('active');
                }
            });
            
            document.querySelectorAll('.faq-question i').forEach(item => {
                if (item !== icon) {
                    item.classList.remove('fa-chevron-up');
                    item.classList.add('fa-chevron-down');
                }
            });
            
            // Toggle current FAQ item
            answer.classList.toggle('active');
            
            if (answer.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        }

        // Form submission
        /*document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: this.querySelector('input[placeholder="Your Name"]').value,
                email: this.querySelector('input[placeholder="Your Email"]').value,
                subject: this.querySelector('input[placeholder="Subject"]').value,
                message: this.querySelector('textarea').value
            };
            
            // Here you would typically send the data to your Flask backend
            console.log('Form data:', data);
            
            // Show success message (you can customize this)
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
            
            // Example of how you might send to Flask backend:
            /*
            fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    alert('Message sent successfully!');
                    this.reset();
                } else {
                    alert('Error sending message. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error sending message. Please try again.');
            });
            
        });
        */

        // Job application handlers
        document.querySelectorAll('.btn-apply').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get job title from the card
                const jobTitle = this.closest('.job-card').querySelector('h5').textContent;
                
                // Here you would typically redirect to an application form or open a modal
                alert(`Application for ${jobTitle} position is currently not available.`);
                
                // Example of how you might handle this with Flask:
                /*
                window.location.href = `/apply/${encodeURIComponent(jobTitle)}`;
                */
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards for animation
        document.querySelectorAll('.service-card, .project-card, .job-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Mobile navbar collapse
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });

        // Portfolio project links (placeholder functionality)
        document.querySelectorAll('.project-card a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const projectTitle = this.closest('.project-card').querySelector('h5').textContent;
                alert(`Viewing project: ${projectTitle}. This would typically open a detailed project page on a new tab.`);
                
                // Example of how you might handle this with Flask:
                /*
                window.location.href = `/portfolio/${encodeURIComponent(projectTitle)}`;
                */
            });
        });

        // Add loading animation
        window.addEventListener('load', function() {
            document.body.classList.add('loaded');
        });

        // Add scroll-to-top functionality
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        document.body.appendChild(scrollToTopBtn);

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });