import React, { useRef, useState } from 'react'
import { useAddPostMutation, useUploadImagesMutation } from '@/lib/api/authApi'
import { PostCreateFormStep1 } from '@/features/features/postCreate/PostCreateFormStep1'
import { PostCreateFormStep2 } from '@/features/features/postCreate/PostCreateFormStep2'
import { GalleryPreview } from '@/features/features/postCreate/GalleryPreview'
import { DotsIndicator } from '@/features/features/postCreate/DotsIndicator'
import { PostCreateFormStep3 } from '@/features/features/postCreate/PostCreateFormStep3'

export const PostCreate = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState(1)
  const [activeIndex, setActiveIndex] = useState(0)
  const [valueDescription, setValueDescription] = useState('')
  const [filesImg, setFilesImg] = useState<File[]>([])
  const [uploadId, setUploadId] = useState<string[]>([])
  const [openReview, setOpenReview] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [uploadImages] = useUploadImagesMutation()
  const [addPost] = useAddPostMutation()

  //--работа с сервером
  const handleUpload = async (files: File[]) => {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('file', file)
    })
    const result = await uploadImages(formData).unwrap()
    const id = result.images.map(img => img.uploadId)
    setUploadId(id)
  }
  const handleUploadImages = async () => {
    try {
      await handleUpload(filesImg)
      setStep(3)
    } catch (error) {
      console.log(error)
    }
  }
  const handlePublish = async () => {
    const body = {
      description: valueDescription,
      childrenMetadata: uploadId.map(id => ({ uploadId: id })),
    }

    try {
      await addPost(body).unwrap()
      setValueDescription('')
    } catch (error) {
      console.log(error)
    }

    setIsModalOpen(false)
  }
  //--работа с UI

  const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 МБ
  const MAX_FILES = 10
  const handleFilesSelected = (files: File[]) => {
    setFilesImg(files)

    setImageUrls(files.map(file => URL.createObjectURL(file)))
    setStep(2)
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])

    // Фильтруем файлы, которые не превышают лимит
    const validFiles = files.filter(file => file.size <= MAX_FILE_SIZE)

    // Показываем предупреждение, если есть большие файлы
    if (validFiles.length < files.length) {
      const oversized = files.filter(file => file.size > MAX_FILE_SIZE)
      alert(
        'Некоторые файлы превышают 20 МБ:\n' +
          oversized.map(f => f.name).join(', ')
      )
    }

    if (validFiles.length > MAX_FILES) {
      alert(`Количество фото не должно превышать ${MAX_FILES}`)
    }

    // Оставляем только первые 10 файлов (если есть старые, добавляем к ним)
    setFilesImg(prev => [...prev, ...validFiles].slice(0, MAX_FILES))

    // Для превью картинок тоже не больше 10
    setImageUrls(prev => {
      const newUrls = validFiles.map(file => URL.createObjectURL(file))
      return [...prev, ...newUrls].slice(0, MAX_FILES)
    })

    if (validFiles.length < 1) {
      return
    }
  }
  const handleRemoveImg = (removeIdx: number) => {
    setImageUrls(prev => {
      const newUrls = prev.filter((_, idx) => idx !== removeIdx)
      setActiveIndex(index => {
        if (newUrls.length === 0) {
          setStep(1)
          return 0
        }
        if (index > newUrls.length - 1) {
          return newUrls.length - 1
        }
        return index
      })
      return newUrls
    })
  }
  const handlePrev = () => {
    setActiveIndex(function (index) {
      if (index > 0) {
        return index - 1
      } else {
        return index
      }
    })
  }
  const handleNext = () => {
    setActiveIndex(function (index) {
      if (index < imageUrls.length - 1) {
        return index + 1
      } else {
        return index
      }
    })
  }
  const handleIsOpenReview = () => {
    setOpenReview(!openReview)
  }
  const resetStep = () => {
    setImageUrls([])
    setStep(1)
  }

  return (
    <div>
      {step === 1 && (
        <PostCreateFormStep1
          maxFiles={MAX_FILES}
          maxFileSize={MAX_FILE_SIZE}
          inputRef={inputRef}
          onClose={() => setIsModalOpen(false)}
          isModalOpen={isModalOpen}
          onFilesSelected={handleFilesSelected}
        />
      )}

      {step === 2 && (
        <PostCreateFormStep2
          imageUrls={imageUrls}
          activeIndex={activeIndex}
          onBack={resetStep}
          onNext={handleNext}
          onPrev={handlePrev}
          openReview={openReview}
          onToggleReview={handleIsOpenReview}
          onNextStep={handleUploadImages}
        >
          {openReview && (
            <GalleryPreview
              imageUrls={imageUrls}
              onRemove={handleRemoveImg}
              inputRef={inputRef}
              handleFileChange={handleFileChange}
            />
          )}
          {imageUrls.length >= 2 && (
            <DotsIndicator
              className={'gap-[6px]'}
              activeColor={'bg-accent-500'}
              inactiveColor={'bg-light-900'}
              imageUrls={imageUrls}
              activeIndex={activeIndex}
            />
          )}
        </PostCreateFormStep2>
      )}

      {step === 3 && (
        <PostCreateFormStep3
          imageUrls={imageUrls}
          setStep={setStep}
          onNext={handleNext}
          onPrev={handlePrev}
          isModalOpen={isModalOpen}
          valueDescription={valueDescription}
          activeIndex={activeIndex}
          handlePublish={handlePublish}
          setValueDescription={setValueDescription}
        >
          {imageUrls.length >= 2 && (
            <DotsIndicator
              className={'gap-[12px] rounded-[2px] bg-[#17171782] p-[8px]'}
              activeColor={'bg-accent-500'}
              inactiveColor={'bg-light-100'}
              imageUrls={imageUrls}
              activeIndex={activeIndex}
            />
          )}
        </PostCreateFormStep3>
      )}
    </div>
  )
}
