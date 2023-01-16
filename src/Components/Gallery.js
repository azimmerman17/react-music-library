import GalleryItem from "./GalleryItem"

const Gallery = ({ data }) => {
  const myData = data.results.read()

const display = myData.map((item, i) => {
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