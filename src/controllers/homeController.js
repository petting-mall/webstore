
module.exports = {
  index: (req, res) => {
    const pageData = {
      title: 'Petting Mall',
      cssList: ['home.css', 'swiper-bundle.min.css'],
      scriptList: ['navbar.js'],
      scriptModuleList: ['homeIndex.js']
    };
    res.render('index', pageData);
  }
};
