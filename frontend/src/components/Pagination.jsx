
import { Text, Button, useColorModeValue, Box, Spacer } from '@chakra-ui/react'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";


const Pagination = ({ totalPages, currentPage, onChange}) => {
	const textColor = useColorModeValue('gray.600', 'gray.200')

	const setPage = (page) => {
		if (page >= 0 && page < totalPages) {
			if (onChange) onChange(page);
		}
	}

	const handlePaginationBtn = (currentPage) => {
		const totalPage = Math.ceil(133 / 12);
		const possiblePages = [];
	
		if (currentPage === 1) {
			for (let i = 1; i <= Math.min(3, totalPage); i++) {
				possiblePages.push(i);
			}
		} else if (currentPage === totalPage) {
			for (let i = Math.max(1, totalPage - 2); i <= totalPage; i++) {
				possiblePages.push(i);
			}
		} else {
			for (let i = currentPage - 1; i <= currentPage + 1; i++) {
				possiblePages.push(i);
			}
		}
	
		return possiblePages;
	};

	const handleNextPrevBtn = (currPage, status) => {
		console.log("Current Page:", currPage);
		
		if (status === 'next') {
			if (currPage < Math.ceil(133 / 12)) {
				setPage(currPage + 1);
			}
		} else if (status === 'prev') {
			if (currPage > 1) {
				setPage(currPage - 1);
			}
		}
	}

	return (
		<Box>
			<Button onClick={() => handleNextPrevBtn(currentPage, 'prev')}>
				<MdChevronLeft fontSize={20} />
			</Button>
			{!handlePaginationBtn(currentPage).includes(1) && (
				<Button onClick={() => setPage(1)}>
					<Text as={'span'} color={textColor} _hover={{ textDecoration: 'underline' }}>
						1
					</Text>
				</Button>
			)}
			{!handlePaginationBtn(currentPage).includes(2) && 
				<Button> 
					<IoEllipsisHorizontalSharp fontSize={20}/>
				</Button>
			}

			{handlePaginationBtn(currentPage).map(i => (
				<Button key={i} onClick={() => setPage(i)}>
					<Text as={currentPage == i ? 'b' : 'span'} color={textColor} _hover={{ textDecoration: 'underline' }}>
						{i}
					</Text>
				</Button>
			))}

			
			{!handlePaginationBtn(currentPage).includes(Math.ceil(133 / 12)-1) && 
				<Button> 
					<IoEllipsisHorizontalSharp fontSize={20}/>
				</Button>
			}
			{!handlePaginationBtn(currentPage).includes(Math.ceil(133 / 12)) && (
				<Button onClick={() => setPage(Math.ceil(133 / 12))}>
					<Text as={'span'} color={textColor} _hover={{ textDecoration: 'underline' }}>
						{Math.ceil(133 / 12)}
					</Text>
				</Button>
			)}
			<Button onClick={() => handleNextPrevBtn(currentPage, 'next')}>
				<MdChevronRight fontSize={20} />
			</Button>
		</Box>
	)
}

export default Pagination