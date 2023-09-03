import {useEffect, useState} from 'react'
import { Box, Flex, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Switch, Text } from '@chakra-ui/react'

export default function FineTuneSettings( {getTrainingParams} : any) {
    const [trainingParams, setTrainingParams] = useState({
        maxSteps: 16,
        matricesUpdateRank: 16,
        scalingFactor: 32,
        perDeviceTrainBatchSize: 1,
        gradientAccumulationSteps: 4,
        warmupSteps: 0,
        bias: 'none',
        taskType: 'CASUAL_LM',
        learningRate: 0.00005,
        dropoutProbability: 0.1,
        pushToHub: false,
        hfUsername: '',
        newModelDir: ''
    })

    const {
        warmupSteps, 
        maxSteps, 
        gradientAccumulationSteps, 
        matricesUpdateRank, 
        scalingFactor, 
        perDeviceTrainBatchSize, 
        learningRate, 
        dropoutProbability, 
        pushToHub, 
        hfUsername,
        newModelDir,
        bias,
        taskType
    } = trainingParams;

    const updateTrainingParams = (e : any, name : string) => {
        console.log("Updating training params...", e)

        if(e?.target) {
            setTrainingParams(prev => ({
                ...prev,
                [e.target.name] : e.target.value
            }))
        } else {
            setTrainingParams(prev => ({
                ...prev,
                [name] : e
            }))
        }
    }

    useEffect(() => {
        getTrainingParams(trainingParams)
    }, [trainingParams])

    return (
        <Box margin={'40px'}>
            <Flex direction={'row'}>
                <Flex direction={'column'}>

                </Flex>
                <Flex direction={'column'}>

                </Flex>
            </Flex>
            <Box>
                <Text>Task Type</Text>
                <Select name='taskType' value={taskType} onChange={(e) => updateTrainingParams(e, "taskType")}>
                    <option value="CAUSAL_LM">CAUSAL_LM</option>
                    <option value="TOKEN_CLS">TOKEN_CLS</option>
                    <option value="SEQ_2_SEQ_LM">SEQ_2_SEQ_LM</option>
                    <option value="QUESTION_ANS">QUESTION_ANS</option>
                    <option value="FEATURE_EXTRACTION">FEATURE_EXTRACTION</option>
                </Select>
            </Box>

            <Box>
                <Text>Update-Matrices Rank</Text>
                <NumberInput value={matricesUpdateRank} precision={2} step={8} min={8} max={64} name='matricesUpdateRank' onChange={(e) => updateTrainingParams(e, "matricesUpdateRank")}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Box>

            <Box>
                <Text>Scaling Factor</Text>
                <NumberInput value={scalingFactor} precision={2} step={8} min={8} max={64} name='scalingFactor' onChange={(e) => updateTrainingParams(e, "scalingFactor")}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Box>

            <Box>
                <Text>Per Device Training Batch Size</Text>
                <NumberInput value={perDeviceTrainBatchSize} step={1} min={1} max={64} name='perDeviceTrainBatchSize' onChange={(e) => updateTrainingParams(e, "perDeviceTrainBatchSize")}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Box>

            <Box>    
                <Text>Dropout Probability </Text> <Text color={'blue.700'}>{dropoutProbability}</Text>
                <Slider aria-label='slider-ex-2' colorScheme='pink' value={dropoutProbability} min={0.0} max={1.0} step={0.01} name='dropoutProbability' onChange={(e) => updateTrainingParams(e, "dropoutProbability")}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                <SliderThumb />
                </Slider>
            </Box>

            <Box>
                <Text>Learning Rate </Text> <Text color={'blue.700'}>{learningRate}</Text>
                <Slider aria-label='slider-ex-2' colorScheme='pink' value={learningRate} min={0.00005} max={0.2} step={0.00001} name='learningRate' onChange={(e) => updateTrainingParams(e, "learningRate")}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                <SliderThumb />
                </Slider>
            </Box>

            <Box>
                <span> <Text>Max Steps  </Text>  <Text color={'blue.700'}>{maxSteps}</Text> </span>
                <Slider aria-label='slider-ex-2' colorScheme='pink' value={maxSteps} min={8} max={1000} step={1} name='maxSteps' onChange={(e) => updateTrainingParams(e, "maxSteps")}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                <SliderThumb />
                </Slider>
            </Box>

            <Box>
                <Text>Warmup Steps </Text> <Text color={'blue.700'}>{warmupSteps}</Text>
                <Slider aria-label='slider-ex-2' colorScheme='pink' value={warmupSteps} min={0} max={64} step={1} name='warmupSteps' onChange={(e) => updateTrainingParams(e, "warmupSteps")}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                <SliderThumb />
                </Slider>
            </Box>

            <Box>
                <Text>Gradient Accumulation Steps </Text> <Text color={'blue.700'}>{gradientAccumulationSteps}</Text>
                <Slider aria-label='slider-ex-2' colorScheme='pink' value={gradientAccumulationSteps} min={0} max={64} step={1} name='gradientAccumulationSteps' onChange={(e) => updateTrainingParams(e, "gradientAccumulationSteps")}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                <SliderThumb />
                </Slider>
            </Box>

            <Box>
                <Text>Bias</Text>
                <RadioGroup onChange={(e) => updateTrainingParams(e, "bias")} value={bias} name='bias'>
                <Stack direction='row'>
                    <Radio value='none'>None</Radio>
                    <Radio value='all'>All</Radio>
                    <Radio value='lora_only'>Bias Only</Radio>
                </Stack>
                </RadioGroup>
            </Box>

            <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor='email-alerts' mb='0'>
                    Upload to hub?
                </FormLabel>
                <Switch name='pushToHub' value={Number(pushToHub)} onChange={(e) => updateTrainingParams(e, "pushToHub")} id='email-alerts' />
                <Input disabled={pushToHub == false} name='hfUsername' value={hfUsername} onChange={(e) => updateTrainingParams(e, "hfUsername")} placeholder='HuggingFace Username'/>
                <Input disabled={pushToHub == false} name='newModelDir' value={newModelDir} onChange={(e) => updateTrainingParams(e, "newModelDir")} placeholder='Model Name or Path on HF'/>
            </FormControl>
        </Box>
    )
}
