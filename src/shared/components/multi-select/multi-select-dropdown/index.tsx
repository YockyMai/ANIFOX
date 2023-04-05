import { AnimatePresence, motion } from "framer-motion"
import React, { FC } from "react"
import styles from "./styles.module.pcss"
import clsx from "clsx"

interface MultiSelectDropdownProps {
  options: { value: string; label: string }[]
  onSelectItem: (item: { value: string; label: string }) => void
  onRemoveItem: (value: string) => void
  isOpen: boolean
  selectedItems: { value: string; label: string }[]
}

export const MultiSelectDropdown: FC<MultiSelectDropdownProps> = ({
  options,
  onSelectItem,
  isOpen,
  selectedItems,
  onRemoveItem,
}) => {
  const selectItem = (item: { value: string; label: string }) => {
    onSelectItem(item)
  }
  const removeItem = (value: string) => {
    onRemoveItem(value)
  }
  const elementIsSelected = (value: string) => {
    return selectedItems.some((item) => item.value === value)
  }

  const onClickItem = (item: { value: string; label: string }) => {
    elementIsSelected(item.value) ? removeItem(item.value) : selectItem(item)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          className={styles.dropdown}
          initial={{ opacity: 0, top: "120%", scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          {options.length > 0 ? (
            options.map((item, index) => (
              <li
                onClick={(e) => {
                  e.stopPropagation()
                  onClickItem(item)
                }}
                className={clsx(
                  elementIsSelected(item.value) && styles.itemSelected,
                  styles.item
                )}
                key={`${item.value}-${index}`}
              >
                {item.label}
              </li>
            ))
          ) : (
            <li className={"text-center text-sm"}>Ничего не найдено :(</li>
          )}
        </motion.ul>
      )}
    </AnimatePresence>
  )
}
