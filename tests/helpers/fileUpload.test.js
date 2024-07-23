import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config( {
  cloud_name: 'dvkrb4ifg',
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
  secure: true
} );

describe( 'Pruebas en fileUpload', () => {

  test( 'Debe de subir el archivo correctamente a Cloudinary', async () => {

    const imageUrl = 'https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png';

    const resp = await fetch( imageUrl );

    const blob = await resp.blob();

    const file = new File( [ blob ], 'Landscape.jpg' );

    const url = await fileUpload( file );

    expect( typeof url ).toBe( 'string' );

    //* Eliminación de la imágen de Cloudinary

    const segments = url.split( '/' );

    const imageId = segments[ segments.length - 1 ].replace( '.png', '' );

    await cloudinary.api.delete_resources( [ 'react-journal-app/' + imageId ], {
      resource_type: 'image'
    } );

  } );

  test( 'Debe de retornar el error cuando la subida falla', async () => {

    const file = new File( [], 'Landscape.jpg' );

    await expect( fileUpload( file ) ).rejects.toThrow( 'Could not upload image.' );

  } );

  test( 'Debe de retornar el error cuando no se envía un archivo', async () => {

    await expect( fileUpload( null ) ).rejects.toThrow( 'There is no file to upload.' );

  } );

} );