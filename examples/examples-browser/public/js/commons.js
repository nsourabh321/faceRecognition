async function requestExternalImage(imageUrl) {
  const res = await fetch('fetch_external_image', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ imageUrl })
  })
  if (!(res.status < 400)) {
    console.error(res.status + ' : ' + await res.text())
    throw new Error('failed to fetch image from url: ' + imageUrl)
  }

  let blob
  try {
    blob = await res.blob()
    return await faceapi.bufferToImage(blob)
  } catch (e) {
    console.error('received blob:', blob)
    console.error('error:', e)
    throw new Error('failed to load image from url: ' + imageUrl)
  }
}

function renderNavBar(navbarId, exampleUri) {
  const examples = [
    {
      uri: 'face_expression_recognition',
      name: 'Face Expression Recognition'
    },
    {
      uri: 'webcam_face_expression_recognition',
      name: 'Webcam Face Expression Recognition'
    }
  ];

  // Get the navbar and page container elements
  const navbar = $(navbarId).get(0);
  console.log($(navbarId))
  const pageContainer = $('.page-container').get(0);
  console.log( $('.page-container'))

  // Add a header displaying the current page's name
  const header = document.createElement('h3');
  header.innerHTML = examples.find(ex => ex.uri === exampleUri).name;
  pageContainer.insertBefore(header, pageContainer.children[0]);

  // Create a simple navigation bar
  const navMenu = document.createElement('div');
  navMenu.classList.add('nav-menu');
  navbar.appendChild(navMenu);

  // Add links to examples in the navbar
  examples.forEach(ex => {
    const navLink = document.createElement('a');
    navLink.href = ex.uri;
    navLink.innerHTML = ex.name;
    navLink.classList.add('nav-link');

    // Highlight the current page
    if (ex.uri === exampleUri) {
      navLink.classList.add('active');
    }

    navMenu.appendChild(navLink);
  });
}


function renderSelectList(selectListId, onChange, initialValue, renderChildren) {
  const select = document.createElement('select')
  $(selectListId).get(0).appendChild(select)
  renderChildren(select)
  $(select).val(initialValue)
  $(select).on('change', (e) => onChange(e.target.value))
  $(select).material_select()
}

function renderOption(parent, text, value) {
  const option = document.createElement('option')
  option.innerHTML = text
  option.value = value
  parent.appendChild(option)
}