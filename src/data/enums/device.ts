export enum Device {
	scene = 'scene',
	light = 'light',
	climate = 'climate',
	cover = 'cover',
	sensor = 'sensor',
	switch = 'switch',
}

export enum DeviceVariant {
	light_variant_OnOff = 'light_variant_OnOff',
	light_variant_dimmer = 'light_variant_dimmer',
	light_variant_color = 'light_variant_color',
	light_variant_temperature = 'light_variant_temperature',

	climate_variant_cond = 'climate_variant_cond',
	climate_variant_thermostat = 'climate_variant_thermostat',

	cover_variant_slider = 'cover_variant_slider',
}
