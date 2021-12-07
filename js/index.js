$(document).ready(function(){

  // Initialize materialize elements
  $('.sidenav').sidenav({
    edge: 'right'
  });

  var projectModal = $('.modal').modal({
    onOpenEnd: initCarousel
  });

  function initCarousel() {
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true
    });
  };

  // JSON data
  var portfolioData = {
    picture: 'media/profile.jpg',
    languages: [
      'media/html.svg',
      'media/css.svg',
      'media/javascript.svg',
      'media/react.svg',
      'media/php.png',
      'media/mysql.png',
      'media/rails.svg',
      'media/python.svg'
    ],
    projects: [
      {
        name: 'SCMI',
        shortDescription: 'Web Based Self-Service Store Monitoring System',
        description: 'SCMI is an online system providing users with the ability to monitor and control the temperature, humidity, and status of fridges and other components in self-service stores.',
        mainPicture: 'media/scmi-main-img.jpg',
        projectLink: 'https://scmi.mx/sistema2',
        pictures: [
          'media/scmi-main-img.jpg',
          'media/scmi-config-camaras.jpg',
          'media/scmi-config-temps.jpg',
          'media/scmi-control.jpg'
        ],
        languages: [
          'media/javascript.svg',
          'media/php.png',
          'media/mysql.png'
        ]
      },
      {
        name: 'Restofácil',
        shortDescription: 'Browser Based Restaurant Management Software',
        description: 'Restofácil is a system built to provide service industry staff with an easy and fast way of managing tables, orders, and customers.',
        mainPicture: 'media/restofacil-main.jpg',
        projectLink: null,
        pictures: [
          'media/restofacil-main.jpg',
          'media/restofacil-mesas.jpg',
          'media/restofacil-ordenes.png',
          'media/restofacil-menu.jpg',
          'media/restofacil-place-order.jpg'
        ],
        languages: [
          'media/javascript.svg',
          'media/php.png',
          'media/mysql.png'
        ]
      },
      {
        name: 'Waste Website',
        shortDescription: 'Waste Information Website for Casa Zimbabwe',
        description: 'This website provides residents of CZ with all the information they need in order to sort waste correctly in their cooperative. It is color coded to represent the corresponding bins.',
        mainPicture: 'media/waste-main.jpg',
        projectLink: null,
        pictures: [
          'media/waste-main.jpg',
          'media/waste-expand-panel.jpg'
        ],
        languages: [
          'media/react.svg',
          'media/javascript.svg',
          'media/php.png',
          'media/mysql.png'
        ]
      },
      {
        name: 'Waste Website Admin',
        shortDescription: 'Administrator Website for Casa Zimbabwe\'s Waste Website',
        description: 'This tool was made for the Waste Reduction Manager so they can easily modify and update the main Waste Website',
        mainPicture: 'media/waste-admin-main.jpg',
        projectLink: null,
        pictures: [
          'media/waste-admin-main.jpg',
          'media/waste-admin-panel.jpg',
          'media/waste-admin-add-panel.jpg'
        ],
        languages: [
          'media/react.svg',
          'media/javascript.svg',
          'media/php.png',
          'media/mysql.png'
        ]
      }
    ]
  };

  var carouselTags = ['#one!', '#two!', '#three!', '#four!', '#five!'];

  // Insert data into about-me page
  $('#about-me-profile-picture').attr('src', portfolioData.picture);
  
  var languageClone = $('#about-me-languages-clone');
  var languagesDiv = $('#about-me-languages');
  $.each(portfolioData.languages, (i, value) => {
    languageClone.clone().removeClass('hide').attr('src', value).appendTo(languagesDiv);
  });

  // Insert data into projects div
  var projectsDiv = $('#projects-div');
  var projectClone = $('#projects-project-tile-clone');
  $.each(portfolioData.projects, (i, val) => {
    var project = projectClone.clone().removeClass('hide');

    project.find('.project-tile-img').attr('src', val.mainPicture);
    project.find('.project-title').text(val.name);

    var projectLanguagesDiv = project.find('.project-tile-languages');
    $.each(val.languages, (j, language) => {
      languageClone.clone().removeClass('hide').attr('src', language).appendTo(projectLanguagesDiv);
    });

    // Handle a click on the more information button
    project.find('.modal-btn').click(() => {
      var modal = $('#modal1');

      // Set information
      modal.find('#modal-name').text(val.name);
      modal.find('#modal-short-description').text(val.shortDescription);
      modal.find('#modal-description').text(val.description);

      // Show link to project if it exists
      if (val.projectLink) {
        modal.find('.btn').attr('href', val.projectLink)
        modal.find('.btn').removeClass('hide');
      } else {
        modal.find('.btn').addClass('hide');
      }

      // Set images for carousel
      var carouselDiv = modal.find('.carousel.carousel-slider');
      var carouselItemClone = modal.find('#modal-image-clone');

      carouselDiv.empty();

      $.each(val.pictures, (j, picture) => {
        var item = carouselItemClone.clone().removeClass('hide');
        
        item.attr('href', carouselTags[j]);
        item.find('img').attr('src', picture);

        carouselDiv.append(item);
      });

      $('.modal').modal('open');
    });

    projectsDiv.append(project);
  });

  // Send contact email to myself when user sends email
  function sendEmail(name, body) {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "robertocardenasportfolio@gmail.com",
      Password: "L7QAa9GK5Jkij2d",
      To: 'robertocardenas@berkeley.edu',
      From: "robertocardenasportfolio@gmail.com",
      Subject: "Portfolio contact from " + name,
      Body: body,
    }).then(
      () => $('#contact-form')[0].reset()
    );
  }

  $('#contact-form').submit((e) => {
    e.preventDefault();

    var body = `${$('#contact-form #textarea1').val()}   ${$('#contact-form #email').val()}`;

    sendEmail($('#contact-form #name').val(), body);
  });

  // Handle navigation active tab
  function setActiveTab(current) {
    var tabs = $('.tab');

    $.each(tabs, (_, tab) => $(tab).removeClass('active'));

    $(current).addClass('active');
  }

  function setActiveSidenavTab(current) {
    var tabs = $('.sidenav-tab');

    $.each(tabs, (_, tab) => $(tab).removeClass('active'));

    $(current).addClass('active');
  }

  // Set the active tab on click
  $.each($('.tab'), (_, tab) => $(tab).click(() => setActiveTab(tab)));
  $.each($('.sidenav-tab'), (_, tab) => $(tab).click(() => setActiveSidenavTab(tab)));

  // Set the active tab on scroll
  $(window).on('scroll', function() {
      var y_scroll_pos = window.pageYOffset;
      var projectsPos = $('#projects').offset().top;
      var contactPos = $('#contact').offset().top;

      // Projects
      if(y_scroll_pos >= projectsPos && y_scroll_pos < contactPos) {
        setActiveTab($('.tab')[1]);
        setActiveSidenavTab($('.sidenav-tab')[1]);
      // Contact
      } else if (y_scroll_pos >= contactPos) {
        setActiveTab($('.tab')[2]);
        setActiveSidenavTab($('.sidenav-tab')[2]);
      // About me
      } else {
        setActiveTab($('.tab')[0]);
        setActiveSidenavTab($('.sidenav-tab')[0]);
      }
  });
});

