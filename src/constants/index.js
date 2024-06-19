export const RealEstatePostStatus = {
    CHUA_DUYET: 0,
    DA_DUYET: 1,
    KHONG_DUYET: 2,
    VI_PHAM: 3,
}

export const RealEstatePostStatusTagStyle = {
    0: {
        value: 0,
        text: 'Chưa duyệt',
        style: 'color: red;'
    },
    1: {
        value: 1,
        text: 'Đã duyệt',
        style: 'color: green;'
    },
    2: {
        value: 2,
        text: 'Không duyệt',
        style: 'color: orange;'
    },
    3: {
        value: 3,
        text: 'Vi phạm',
        style: 'color: purple;'
    },
}

export const RealEstatePostStatuses = [
    { value: 0, text: 'Chưa duyệt' },
    { value: 1, text: 'Đã duyệt' },
    { value: 2, text: 'Không duyệt' },
    { value: 3, text: 'Vi phạm' },
]