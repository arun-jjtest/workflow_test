import { FormEvent, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { Input } from "../Input/Input";
import { fetchMockNewsletters } from "../mocks/newsletters";

import styles from "./Newsletters.module.css";
import { NewsletterItem } from "./types";
import { Table } from "./Table/Table";

const queryKey = "newsletters";

export const Newsletters = () => {
  const [searchTerm, setValue] = useState("");
  const queryClient = useQueryClient();
  const { data } = useQuery<NewsletterItem[]>(queryKey, fetchMockNewsletters);

  const onChange = (event: FormEvent) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;
    setValue(value);
  };

  const removeItem = (id: string) => {
    const listWithRemovedItem = data?.filter((item) => item.id !== id);
    queryClient.setQueryData(queryKey, listWithRemovedItem);
  };

  const filteredData = useMemo(() => {
    return data?.filter((item) =>
      Object.entries(item)
        .filter(([key]) => key !== "creator")
        .some(([, value]) => value.includes(searchTerm))
    );
  }, [data, searchTerm]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title} id="titleText">Newlsetters</h1>
      <div className={styles.search}>
        <Input placeholder="Search…" value={searchTerm} onChange={onChange} />
      </div>
      <Table data={filteredData} removeItem={removeItem} />
    </div>
  );
};
