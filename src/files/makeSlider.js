

export const makeSlider = (data, slideNumber, numPerSlide) => {



    const dataPerSlide = numPerSlide;
    const slideDisplayed = slideNumber * dataPerSlide;

    const displayData = data.slice(slideDisplayed, slideDisplayed + dataPerSlide);

    const slideCount = Math.ceil(data.length / dataPerSlide);


    return { slideCount, displayData };

}