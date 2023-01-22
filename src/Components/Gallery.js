import GalleryItem from './GalleryItem'

const Gallery = ({ data }) => {

  const display = data.map((item, i) => {
  return (
    <GalleryItem key={i} item={item} />
  )
})

  return (
    <div>
      {display}
    </div>
  )
}

export default Gallery