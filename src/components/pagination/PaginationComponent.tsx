"use client";
import React, {useState} from 'react'
import Pagination from "@mui/material/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import styles from './PaginationComponent.module.scss'

const PaginationComponent = ({
  dataLength,
}: {
  dataLength: number;
}) => {
  const searchParams = useSearchParams()

  const [page, setPage] = useState(Number(searchParams.get('page') || 1));
  const router = useRouter();
  const perPage = "4";
  const length = dataLength;

  const handleChange = (event:any, value:number) => {
    router.push(`/product?page=${value}`);
    setPage(value)
  };

  return (
    <div className={styles.paginationComponent}>
      <Pagination page={page} color="secondary" count={Math.ceil(length / Number(perPage))} onChange={handleChange}/>
    </div>
  );
};

export default PaginationComponent;
