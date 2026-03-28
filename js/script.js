$(document).ready(function () {

    // Fetch unified JSON Data
    $.getJSON('data/services.json', function (data) {
        
        // 1. Render Signature Services
        const $servicesGrid = $('#signatureServicesGrid');
        if (data.services && data.services.length > 0) {
            $.each(data.services, function (index, service) {
                const card = `
                <div class="col-md-6">
                    <div class="service-card">
                        <img src="${service.image}" alt="${service.title}">
                        <div class="service-card-overlay">
                            <h3>${service.title}</h3>
                            <p>${service.description}</p>
                            <a href="#services" class="learn-more">Learn More <i class="fa-solid fa-arrow-right ms-1"></i></a>
                        </div>
                    </div>
                </div>
                `;
                $servicesGrid.append(card);
            });
        }

        // 2. Render Testimonials
        const $testGrid = $('#testimonialsGrid');
        if (data.testimonials && data.testimonials.length > 0) {
            $.each(data.testimonials, function (index, test) {
                
                let starsHTML = '';
                for(let i=0; i<test.rating; i++) {
                    starsHTML += '<i class="fa-solid fa-star"></i>';
                }

                const card = `
                <div class="col-md-4">
                    <div class="testimonial-card">
                        <div class="test-header">
                            <img src="${test.avatar}" alt="${test.name}" class="test-avatar">
                            <div class="test-info">
                                <h4>${test.name}</h4>
                                <span>${test.service}</span>
                            </div>
                        </div>
                        <div class="test-stars">
                            ${starsHTML}
                        </div>
                        <p class="test-review">"${test.review}"</p>
                    </div>
                </div>
                `;
                $testGrid.append(card);
            });
        }

        // 3. Render Instagram Gallery
        const $galleryGrid = $('#instaGrid');
        if (data.gallery && data.gallery.length > 0) {
            $.each(data.gallery, function (index, imgUrl) {
                const imgWrap = `
                <div class="col-6 col-md-4 col-lg-2">
                    <div class="gallery-img-wrap">
                        <img src="${imgUrl}" alt="Gallery image ${index + 1}">
                    </div>
                </div>
                `;
                $galleryGrid.append(imgWrap);
            });
        }

    }).fail(function() {
        console.error("Failed to load data/services.json.");
    });

    // Fetch About Page Data
    if ($('#journeyTimeline').length) {
        $.getJSON('data/about.json', function (data) {
            
            // Timeline
            if (data.journey) {
                const $timeline = $('#journeyTimeline');
                $.each(data.journey, function(i, item) {
                    const timelineHtml = `
                    <div class="timeline-item">
                        <div class="timeline-dot font-montserrat">${item.year}</div>
                        <div class="timeline-content">
                            <h4>${item.title}</h4>
                            <p class="font-montserrat">${item.description}</p>
                        </div>
                    </div>
                    `;
                    $timeline.append(timelineHtml);
                });
            }

            // Values
            if (data.values) {
                const $valuesGrid = $('#valuesGrid');
                $.each(data.values, function(i, val) {
                    const valueHtml = `
                    <div class="col-sm-6 col-lg-3">
                        <div class="value-card">
                            <div class="value-icon"><i class="fa-solid ${val.icon}"></i></div>
                            <h4 class="font-montserrat mb-3">${val.title}</h4>
                            <p class="font-montserrat text-muted small mb-0">${val.description}</p>
                        </div>
                    </div>
                    `;
                    $valuesGrid.append(valueHtml);
                });
            }

            // Experts
            if (data.experts) {
                const $expertsGrid = $('#expertsGrid');
                $.each(data.experts, function(i, expert) {
                    const expertHtml = `
                    <div class="col-sm-6 col-lg-3">
                        <div class="expert-card">
                            <img src="${expert.image}" class="expert-img" alt="${expert.name}">
                            <h4 class="expert-name">${expert.name}</h4>
                            <p class="expert-role font-montserrat">${expert.role}</p>
                        </div>
                    </div>
                    `;
                    $expertsGrid.append(expertHtml);
                });
            }
        }).fail(function() {
            console.error("Failed to load data/about.json.");
        });
    }

    // Fetch Full Services Page Data
    if ($('#allServicesGrid').length) {
        $.getJSON('data/all_services.json', function (data) {
            const $grid = $('#allServicesGrid');
            $.each(data, function(i, service) {
                const cardHtml = `
                <div class="col-md-6 col-lg-4">
                    <div class="full-service-card shadow-sm">
                        <div class="fsc-img-wrap">
                            <img src="${service.image}" alt="${service.title}">
                            <div class="fsc-badge">From LKR ${service.price}</div>
                        </div>
                        <div class="fsc-content">
                            <h3 class="fsc-title">${service.title}</h3>
                            <p class="fsc-desc font-montserrat">${service.description}</p>
                            <div class="fsc-meta font-montserrat">
                                <i class="fa-regular fa-clock"></i> ${service.duration}
                            </div>
                            <div class="px-3">
                                <a href="booking.html" class="btn-book-now btn-service-card-glow font-montserrat py-3">Book Your Glow</a>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                $grid.append(cardHtml);
            });
        }).fail(function() {
            console.error("Failed to load data/all_services.json.");
        });
    }

    // Fetch Gallery Page Data
    if ($('#masonryGalleryGrid').length) {
        $.getJSON('data/gallery.json', function (data) {
            const $grid = $('#masonryGalleryGrid');
            if (data.images) {
                $.each(data.images, function(i, url) {
                    const imgHtml = `
                    <div class="masonry-item">
                        <img src="${url}" alt="Luxe Beauty Gallery ${i+1}">
                    </div>
                    `;
                    $grid.append(imgHtml);
                });
            }
        }).fail(function() {
            console.error("Failed to load data/gallery.json.");
        });
    }

    // Smooth Scroll for Hash Links
    $("a.nav-link, a.btn, .scroll-down a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70 
            }, 800);
        }
    });

    // Navbar collapse on mobile after clicking a link
    $('.navbar-nav>li>a').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });
    
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.custom-navbar').css('background', 'rgba(255, 255, 255, 1)');
            $('.custom-navbar').css('box-shadow', '0 2px 10px rgba(0,0,0,0.1)');
        } else {
            $('.custom-navbar').css('background', 'rgba(255, 255, 255, 0.75)');
            $('.custom-navbar').css('box-shadow', 'none');
        }
    });

});
