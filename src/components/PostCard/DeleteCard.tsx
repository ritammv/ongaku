import React from 'react';
import { IconButton, 
  AlertDialog, 
  AlertDialogOverlay, 
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { HiDotsVertical } from 'react-icons/hi';

interface Props {
  deletePost: (postId: string, commentAuthor: number) => void;
  post: Post | PostComment
}

const DeleteCard : React.FC<Props> = ({ deletePost, post }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <>

      <IconButton
        aria-label='delete post'
        icon={<HiDotsVertical />}
        backgroundColor='inherit'
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}

      >
        <AlertDialogOverlay>
          <AlertDialogContent backgroundColor='#2d3848'>
            <AlertDialogHeader color='#ffff' fontSize="lg" fontWeight="bold">
              Want to delete?
            </AlertDialogHeader>
            <AlertDialogFooter>
              <button 
                className='genre_tag_button'
                type='button'
                onClick={() => deletePost(post.id, post.userId)} 
              >
                Delete
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteCard;